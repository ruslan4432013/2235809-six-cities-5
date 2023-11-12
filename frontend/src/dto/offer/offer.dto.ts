import { Coords } from './types';
import { UserDto } from '../user/user.dto';

export class OfferDto {

  public id: string;

  public title: string;

  public description: string;

  public postDate: Date;

  public city: string;

  public images: string[];

  public isPremium: boolean;

  public isFavorite: boolean;

  public rating: number;

  public houseType: string;

  public roomsCount: number;

  public guestsCount: number;

  public commentsCount: number;

  public rentPrice: number;

  public preview: string;

  public facilities: string[];

  public author: UserDto;

  public coords: Coords;
}
