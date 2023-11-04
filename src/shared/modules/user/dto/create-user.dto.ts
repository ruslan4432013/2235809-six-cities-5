import { UserType } from '../../../types/index.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { CREATE_USER_MESSAGES } from './create-user.messages.js';
import { USER_FIELDS_LENGTH } from '../user.constant.js';

export class CreateUserDto {
  @IsEmail({}, { message: CREATE_USER_MESSAGES.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_USER_MESSAGES.NAME.INVALID_FORMAT })
  @Length(USER_FIELDS_LENGTH.NAME.MIN, USER_FIELDS_LENGTH.NAME.MAX, { message: CREATE_USER_MESSAGES.NAME.LENGTH_FIELD })
  public name: string;

  @IsString({ message: CREATE_USER_MESSAGES.PASSWORD.INVALID_FORMAT })
  @Length(USER_FIELDS_LENGTH.PASSWORD.MIN, USER_FIELDS_LENGTH.PASSWORD.MAX, { message: CREATE_USER_MESSAGES.PASSWORD.LENGTH_FIELD })
  public password: string;

  @IsEnum(UserType, { message: CREATE_USER_MESSAGES.TYPE.INVALID_FORMAT })
  public type: UserType;
}
