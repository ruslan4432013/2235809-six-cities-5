import { inject, injectable } from 'inversify';
import {
  BaseController, DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';


@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId', 'body'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ) {
    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
