import { Coords, HouseType } from '../../../types/index.js';
import { Facilities } from '../../../types/facilities.type.js';

export class CreateOfferDto {
  public authorId: string;
  public city: string;
  public commentsCount: number;
  public coords: Coords;
  public description: string;
  public facilities: Facilities[];
  public guestsCount: number;
  public houseType: HouseType;
  public images: string[];
  public isFavorites: boolean;
  public isPremium: boolean;
  public postDate: Date;
  public preview: string;
  public rating: number;
  public rentPrice: number;
  public roomsCount: number;
  public title: string;
}
