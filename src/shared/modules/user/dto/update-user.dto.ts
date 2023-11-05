import { UserType } from '../../../types/index.js';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { CREATE_USER_MESSAGES } from './validation-user.messages.js';
import { USER_FIELDS_LENGTH } from '../user.constant.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: CREATE_USER_MESSAGES.NAME.INVALID_FORMAT })
  @Length(USER_FIELDS_LENGTH.NAME.MIN, USER_FIELDS_LENGTH.NAME.MAX, { message: CREATE_USER_MESSAGES.NAME.LENGTH_FIELD })
  public name?: string;

  @IsOptional()
  @IsEmail(undefined, { message: CREATE_USER_MESSAGES.EMAIL.INVALID_FORMAT })
  public email?: string;

  @IsOptional()
  @IsEnum(UserType, { message: CREATE_USER_MESSAGES.TYPE.INVALID_FORMAT })
  public type?: UserType;

  @IsOptional()
  public avatarPath?: string;
}
