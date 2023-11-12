import { UserDto } from '../user/user.dto';

export class CommentDto {
  public id: string;

  public text: string;

  public postDate: string;

  public user: UserDto;

  public rating: number;
}
