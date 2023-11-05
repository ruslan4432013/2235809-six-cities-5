import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { CreateUserRequest } from './types/create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './types/login-user-request.type.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { FavoriteOfferRequest } from './types/favorite-offer-request.type.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { ALLOWED_AVATAR_EXTENSIONS } from './user.constant.js';


@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: AuthService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId', 'params'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar', ALLOWED_AVATAR_EXTENSIONS)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/favorite-offers',
      method: HttpMethod.Post,
      handler: this.addFavoriteOffer,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/favorite-offers',
      method: HttpMethod.Delete,
      handler: this.removeFavoriteOffer,
      middlewares: [new PrivateRouteMiddleware()]
    });
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, { ...responseData, token });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController',
      );
    }
    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatarPath: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatarPath }));
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async addFavoriteOffer(req: FavoriteOfferRequest, res: Response) {
    const { tokenPayload, body: { offerId } } = req;
    const user = await this.userService.addFavoriteOfferToUser(tokenPayload.id, offerId);
    this.ok(res, fillDTO(UserRdo, user));
  }

  public async removeFavoriteOffer(req: FavoriteOfferRequest, res: Response) {
    const { tokenPayload, body: { offerId } } = req;
    const user = await this.userService.removeFavoriteOfferToUser(tokenPayload.id, offerId);
    this.ok(res, fillDTO(UserRdo, user));
  }
}
