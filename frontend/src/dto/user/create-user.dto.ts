import { UserType } from '../../const';

export class CreateUserDto {
  public email: string;

  public name: string;

  public password: string;

  public type: UserType;
}
