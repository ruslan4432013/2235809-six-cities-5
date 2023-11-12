import { Coords, Facilities } from './types';
import { CityName, Type } from '../../types/types';

export class CreateOfferDto {

  public city: CityName;

  public coords: Coords;

  public description: string;

  public facilities: Facilities[];

  public guestsCount: number;

  public houseType: Type;

  public images: string[];

  public isPremium: boolean;

  public postDate: Date;

  public preview: string;

  public rentPrice: number;

  public roomsCount: number;

  public title: string;
}
