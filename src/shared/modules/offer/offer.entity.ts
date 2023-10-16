import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { Coords, HouseType } from '../../types/index.js';
import { Facilities } from '../../types/facilities.type.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
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

  @prop({ ref: () => UserEntity, required: true })
  public authorId: Ref<UserEntity>;

  @prop({ required: true })
  public coords: Coords;

  @prop({
    enum: Facilities,
    type: () => String
  })
  public facilities: Facilities[];

  @prop({ default: 0 })
  public guestsCount: number;

  @prop({
    type: () => String,
    enum: HouseType
  })
  public houseType: HouseType;

  @prop()
  public isPremium: boolean;

  @prop()
  public postDate: Date;

  @prop()
  public rentPrice: number;

  @prop()
  public roomsCount: number;
}

export const OfferModel = getModelForClass(OfferEntity);
