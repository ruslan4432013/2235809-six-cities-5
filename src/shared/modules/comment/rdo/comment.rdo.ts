import { UserRdo } from '../../user/rdo/user.rdo.js';
import { Expose, Type } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose({ name: 'createdAt' })
  public postDate: string;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
