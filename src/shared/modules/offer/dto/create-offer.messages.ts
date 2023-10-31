import {
  DESCRIPTION_LENGTH,
  GUEST_COUNT_LENGTH,
  RENT_PRICE,
  ROOMS_COUNT_LENGTH,
  TITLE_LENGTH
} from '../offer.constant.js';

export const CREATE_OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `Minimum title length must be ${TITLE_LENGTH.MIN}`,
    MAX_LENGTH: `Maximum title length must be ${TITLE_LENGTH.MAX}`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Minimum description length must be ${DESCRIPTION_LENGTH.MIN}`,
    MAX_LENGTH: `Maximum description length must be ${DESCRIPTION_LENGTH.MAX}`,
  },
  POST_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO date',
  },
  HOUSE_TYPE: {
    INVALID_FORMAT: 'type must be apartment, house, room of hotel',
  },
  FACILITIES: {
    INVALID_FORMAT: 'facilities must be array',
    INVALID_VALUE: 'facilities must be on of (Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels Fridge)',
  },
  CITY: {
    INVALID_FORMAT: 'city must be one of six cities (Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf)',
  },
  RENT_PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum price is ${RENT_PRICE.MIN}`,
    MAX_VALUE: `Maximum price is ${RENT_PRICE.MAX}`,
  },
  ROOMS_COUNT: {
    INVALID_FORMAT: 'Rooms count must be an integer',
    MIN_VALUE: `Minimum rooms is ${ROOMS_COUNT_LENGTH.MIN}`,
    MAX_VALUE: `Maximum rooms is ${ROOMS_COUNT_LENGTH.MAX}`,
  },
  PREVIEW: {
    MAX_VALUE: 'Too short for field «preview»',
  },
  IMAGES: {
    INVALID_FORMAT: 'Images must be an array',
  },
  GUEST_COUNT: {
    INVALID_FORMAT: 'Guest count must be an integer',
    MIN_VALUE: `Minimum guests is ${GUEST_COUNT_LENGTH.MIN}`,
    MAX_VALUE: `Maximum guests is ${GUEST_COUNT_LENGTH.MAX}`,
  },
  USER_ID: {
    INVALID_ID: 'userId field must be a valid id',
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium field must be an boolean',
  },
} as const;
