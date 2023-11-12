import { Cities, Coords, Facilities, HouseType } from './types';

export class UpdateOfferDto {

  public authorId?: string;


  public city?: Cities;

  public coords?: Coords;

  public description?: string;

  public facilities?: Facilities[];

  public guestsCount?: number;

  public houseType?: HouseType;

  public images?: string[];

  public isPremium?: boolean;

  public preview?: string;

  public postDate?: Date;

  public rentPrice?: number;

  public roomsCount?: number;

  public title?: string;
}
