import { getModelForClass, prop, modelOptions, defaultClasses } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';


@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User, defaultClasses.Base {
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

  _id: defaultClasses.Base['_id'];
  id: string;

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
