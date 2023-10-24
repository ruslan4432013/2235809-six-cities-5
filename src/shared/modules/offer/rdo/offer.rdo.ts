import { Expose } from 'class-transformer';
import { Coords } from '../../../types/index.js';

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

  @Expose()
  public authorId: string;

  @Expose()
  public coords: Coords;
}
