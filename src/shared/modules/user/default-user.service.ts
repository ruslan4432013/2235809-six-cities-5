import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { OfferEntity } from '../offer/index.js';
import { DEFAULT_AVATAR } from './user.constant.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async addFavoriteOfferToUser(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Пользователь не найден', 'UserService');
    }
    const offer = await this.offerModel.findOne({_id: offerId});
    if (!offer) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Предложение не найдено', 'UserService');
    }
    if (!user.favoriteOffers.map((el) => String(el._id)).includes(offerId)) {
      user.favoriteOffers.push(offer);
      await user.save();
    }
    return user;
  }

  public async removeFavoriteOfferToUser(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Пользователь не найден', 'UserService');
    }
    const index = user.favoriteOffers.map((offer) => String(offer._id)).indexOf(offerId);
    if (index !== -1) {
      user.favoriteOffers.splice(index, 1);
      await user.save();
    }
    return user;
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatarPath: DEFAULT_AVATAR });
    user.setPassword(dto.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findById(userId?: string): Promise<DocumentType<UserEntity> | null> {
    if (!userId) {
      return null;
    }
    return this.userModel.findById(userId);
  }


  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }
    return this.create(dto, salt);
  }
}
