import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DocumentExists } from '../../types/document-exists.interface.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findById(userId?: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;

  addFavoriteOfferToUser(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;

  removeFavoriteOfferToUser(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
}

