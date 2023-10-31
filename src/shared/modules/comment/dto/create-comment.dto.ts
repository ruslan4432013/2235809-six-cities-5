import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CREATE_COMMENT_MESSAGES } from './create-comment.messages.js';
import { RATE, TEXT_LENGTH } from '../comment.constants.js';

export class CreateCommentDto {
  @IsString({ message: CREATE_COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(TEXT_LENGTH.MIN, TEXT_LENGTH.MAX, { message: CREATE_COMMENT_MESSAGES.TEXT.LENGTH_FIELD })
  public text: string;

  @IsMongoId({ message: CREATE_COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
  public offerId: string;

  public userId: string;

  @IsInt({ message: CREATE_COMMENT_MESSAGES.RATE.INVALID_FORMAT })
  @Min(RATE.MIN, { message: CREATE_COMMENT_MESSAGES.RATE.MIN_VALUE })
  @Max(RATE.MAX, { message: CREATE_COMMENT_MESSAGES.RATE.MAX_VALUE })
  public rating: number;
}
