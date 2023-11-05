import { Cities, Coords, HouseType } from '../../../types/index.js';
import { Facilities } from '../../../types/facilities.type.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject, Max,
  MaxLength, Min,
  MinLength,
} from 'class-validator';
import { CREATE_OFFER_VALIDATION_MESSAGES } from './validation-offer.messages.js';
import {
  DESCRIPTION_LENGTH,
  GUEST_COUNT_LENGTH,
  RENT_PRICE,
  ROOMS_COUNT_LENGTH, TITLE_LENGTH
} from '../offer.constant.js';

export class CreateOfferDto {
  public authorId: string;

  @IsEnum(Cities, { message: CREATE_OFFER_VALIDATION_MESSAGES.CITY.INVALID_FORMAT })
  public city: Cities;

  @IsObject()
  public coords: Coords;

  @MinLength(DESCRIPTION_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGES.DESCRIPTION.MIN_LENGTH })
  @MaxLength(DESCRIPTION_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGES.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGES.FACILITIES.INVALID_FORMAT })
  @IsEnum(Facilities, { message: CREATE_OFFER_VALIDATION_MESSAGES.FACILITIES.INVALID_VALUE, each: true })
  public facilities: Facilities[];

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGES.GUEST_COUNT.INVALID_FORMAT })
  @Min(GUEST_COUNT_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGES.GUEST_COUNT.MIN_VALUE })
  @Max(GUEST_COUNT_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGES.GUEST_COUNT.MAX_VALUE })
  public guestsCount: number;

  @IsEnum(HouseType, { message: CREATE_OFFER_VALIDATION_MESSAGES.HOUSE_TYPE.INVALID_FORMAT })
  public houseType: HouseType;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGES.IMAGES.INVALID_FORMAT })
  public images: string[];

  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGES.IS_PREMIUM.INVALID_FORMAT })
  public isPremium: boolean;

  @IsDateString({}, { message: CREATE_OFFER_VALIDATION_MESSAGES.POST_DATE.INVALID_FORMAT })
  public postDate: Date;

  public preview: string;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGES.RENT_PRICE.INVALID_FORMAT })
  @Min(RENT_PRICE.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGES.RENT_PRICE.MIN_VALUE })
  @Max(RENT_PRICE.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGES.RENT_PRICE.MAX_VALUE })
  public rentPrice: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_COUNT.INVALID_FORMAT })
  @Min(ROOMS_COUNT_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_COUNT.MIN_VALUE })
  @Max(ROOMS_COUNT_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGES.ROOMS_COUNT.MAX_VALUE })
  public roomsCount: number;

  @MinLength(TITLE_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGES.TITLE.MIN_LENGTH })
  @MaxLength(TITLE_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGES.TITLE.MAX_LENGTH })
  public title: string;
}
