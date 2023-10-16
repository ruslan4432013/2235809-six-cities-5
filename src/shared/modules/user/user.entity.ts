import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { OfferEntity } from '../offer/index.js';


export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: true })
  public password: string;

  @prop({
    required: false,
    type: () => String,
    enum: UserType
  })
  public type: UserType;

  @prop({
    ref: 'OfferEntity',
    default: [],
  })
  public favoriteOffers: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.type = userData.type;
    this.name = userData.name;
    this.avatar = userData.avatar;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
