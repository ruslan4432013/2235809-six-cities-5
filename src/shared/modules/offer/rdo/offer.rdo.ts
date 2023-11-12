import { Expose, Type } from 'class-transformer';
import { Coords } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public houseType: string;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public facilities: string[];

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public coords: Coords;
}
