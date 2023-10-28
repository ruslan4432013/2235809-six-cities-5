import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import { RATE, TEXT_LENGTH } from '../comment.constants.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(TEXT_LENGTH.MIN, TEXT_LENGTH.MAX, { message: CreateCommentMessages.text.lengthField })
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId: string;

  @IsInt({ message: CreateCommentMessages.rate.invalidFormat })
  @Min(RATE.MIN, { message: CreateCommentMessages.rate.minValue })
  @Max(RATE.MAX, { message: CreateCommentMessages.rate.maxValue })
  public rating: number;
}
