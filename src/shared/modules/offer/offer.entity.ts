import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Coords, HouseType } from '../../types/index.js';
import type { Types } from 'mongoose';
import { Facilities } from '../../types/facilities.type.js';
import { UserEntity } from '../user/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements defaultClasses.Base {
  _id: Types.ObjectId;
  id: string;
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true })
  public description: string;

  @prop()
  public preview: string;

  @prop()
  public images: string[];

  @prop()
  public city: string;

  @prop({ ref: UserEntity, required: true })
  public authorId: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount: number;

  @prop({ required: true })
  public coords: Coords;

  @prop({ default: [] })
  public facilities: Facilities[];

  @prop({ default: 0 })
  public guestsCount: number;

  @prop({
    type: () => String,
    enum: HouseType
  })
  public houseType: HouseType;

  @prop()
  public isFavorites: boolean;

  @prop()
  public isPremium: boolean;

  @prop()
  public postDate: Date;

  @prop()
  public rating: number;

  @prop()
  public rentPrice: number;

  @prop()
  public roomsCount: number;
}

export const OfferModel = getModelForClass(OfferEntity);
