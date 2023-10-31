import { Cities, Coords, HouseType } from '../../../types/index.js';
import { Facilities } from '../../../types/facilities.type.js';
import {
  IsArray,
  IsBoolean, IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsObject, IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';
import {
  DESCRIPTION_LENGTH,
  GUEST_COUNT_LENGTH,
  PREVIEW_LENGTH,
  RENT_PRICE,
  ROOMS_COUNT_LENGTH, TITLE_LENGTH
} from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsMongoId({ message: CREATE_OFFER_VALIDATION_MESSAGE.USER_ID.INVALID_ID })
  public authorId?: string;

  @IsOptional()
  @IsEnum(Cities, { message: CREATE_OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  public city?: Cities;

  @IsOptional()
  @IsObject()
  public coords?: Coords;

  @IsOptional()
  @MinLength(DESCRIPTION_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(DESCRIPTION_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description?: string;

  @IsOptional()
  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.FACILITIES.INVALID_FORMAT })
  @IsEnum(Facilities, { message: CREATE_OFFER_VALIDATION_MESSAGE.FACILITIES.INVALID_VALUE, each: true })
  public facilities?: Facilities[];

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.GUEST_COUNT.INVALID_FORMAT })
  @Min(GUEST_COUNT_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGE.GUEST_COUNT.MIN_VALUE })
  @Max(GUEST_COUNT_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.GUEST_COUNT.MAX_VALUE })
  public guestsCount?: number;

  @IsOptional()
  @IsEnum(HouseType, { message: CREATE_OFFER_VALIDATION_MESSAGE.HOUSE_TYPE.INVALID_FORMAT })
  public houseType?: HouseType;

  @IsOptional()
  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.INVALID_FORMAT })
  public isPremium?: boolean;

  @IsOptional()
  @IsDateString({}, { message: CREATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate?: Date;

  @IsOptional()
  @MaxLength(PREVIEW_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW.MAX_VALUE })
  public preview?: string;

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.RENT_PRICE.INVALID_FORMAT })
  @Min(RENT_PRICE.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGE.RENT_PRICE.MIN_VALUE })
  @Max(RENT_PRICE.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.RENT_PRICE.MAX_VALUE })
  public rentPrice?: number;

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.ROOMS_COUNT.INVALID_FORMAT })
  @Min(ROOMS_COUNT_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGE.ROOMS_COUNT.MIN_VALUE })
  @Max(ROOMS_COUNT_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.ROOMS_COUNT.MAX_VALUE })
  public roomsCount?: number;

  @IsOptional()
  @MinLength(TITLE_LENGTH.MIN, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(TITLE_LENGTH.MAX, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;
}
