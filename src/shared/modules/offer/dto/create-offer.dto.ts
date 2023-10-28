import { Cities, Coords, HouseType } from '../../../types/index.js';
import { Facilities } from '../../../types/facilities.type.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsObject, Max,
  MaxLength, Min,
  MinLength,
} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  DESCRIPTION_LENGTH,
  GUEST_COUNT_LENGTH,
  PREVIEW_LENGTH,
  RENT_PRICE,
  ROOMS_COUNT_LENGTH, TITLE_LENGTH
} from '../offer.constant.js';

export class CreateOfferDto {
  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public authorId: string;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: Cities;

  @IsObject()
  public coords: Coords;

  @MinLength(DESCRIPTION_LENGTH.MIN, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DESCRIPTION_LENGTH.MAX, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(Facilities, { message: CreateOfferValidationMessage.facilities.invalidValue, each: true })
  public facilities: Facilities[];

  @IsInt({ message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(GUEST_COUNT_LENGTH.MIN, { message: CreateOfferValidationMessage.guestCount.minValue })
  @Max(GUEST_COUNT_LENGTH.MAX, { message: CreateOfferValidationMessage.guestCount.maxValue })
  public guestsCount: number;

  @IsEnum(HouseType, { message: CreateOfferValidationMessage.houseType.invalidFormat })
  public houseType: HouseType;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @MaxLength(PREVIEW_LENGTH.MAX, { message: CreateOfferValidationMessage.preview.maxValue })
  public preview: string;

  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(RENT_PRICE.MIN, { message: CreateOfferValidationMessage.rentPrice.minValue })
  @Max(RENT_PRICE.MAX, { message: CreateOfferValidationMessage.rentPrice.maxValue })
  public rentPrice: number;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(ROOMS_COUNT_LENGTH.MIN, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(ROOMS_COUNT_LENGTH.MAX, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount: number;

  @MinLength(TITLE_LENGTH.MIN, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(TITLE_LENGTH.MAX, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;
}
