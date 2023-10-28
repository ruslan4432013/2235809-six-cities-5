import {
  DESCRIPTION_LENGTH,
  GUEST_COUNT_LENGTH,
  RENT_PRICE,
  ROOMS_COUNT_LENGTH,
  TITLE_LENGTH
} from '../offer.constant.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${TITLE_LENGTH.MIN}`,
    maxLength: `Maximum title length must be ${TITLE_LENGTH.MAX}`,
  },
  description: {
    minLength: `Minimum description length must be ${DESCRIPTION_LENGTH.MIN}`,
    maxLength: `Maximum description length must be ${DESCRIPTION_LENGTH.MAX}`,
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  houseType: {
    invalidFormat: 'type must be apartment, house, room of hotel',
  },
  facilities: {
    invalidFormat: 'facilities must be array',
    invalidValue: 'facilities must be on of (Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels Fridge)',
  },
  city: {
    invalidFormat: 'city must be one of six cities (Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf)',
  },
  rentPrice: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${RENT_PRICE.MIN}`,
    maxValue: `Maximum price is ${RENT_PRICE.MAX}`,
  },
  roomsCount: {
    invalidFormat: 'Rooms count must be an integer',
    minValue: `Minimum rooms is ${ROOMS_COUNT_LENGTH.MIN}`,
    maxValue: `Maximum rooms is ${ROOMS_COUNT_LENGTH.MAX}`,
  },
  preview: {
    maxValue: 'Too short for field «preview»',
  },
  images: {
    invalidFormat: 'Images must be an array',
  },
  guestCount: {
    invalidFormat: 'Guest count must be an integer',
    minValue: `Minimum guests is ${GUEST_COUNT_LENGTH.MIN}`,
    maxValue: `Maximum guests is ${GUEST_COUNT_LENGTH.MAX}`,
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  isPremium: {
    invalidFormat: 'isPremium field must be an boolean',
  },
} as const;
