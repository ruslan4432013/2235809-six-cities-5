import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';


export interface CommentEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({ required: true })
  public rating: number;
}

export const CommentModel = getModelForClass(CommentEntity);
