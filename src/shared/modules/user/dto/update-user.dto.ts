import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public type?: UserType;
  public avatarPath?: string;
}
