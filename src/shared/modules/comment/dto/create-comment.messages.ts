import { RATE, TEXT_LENGTH } from '../comment.constants.js';

export const CREATE_COMMENT_MESSAGES = {
  TEXT: {
    INVALID_FORMAT: 'text is required',
    LENGTH_FIELD: `min length is ${TEXT_LENGTH.MIN}, max is ${TEXT_LENGTH.MAX}`
  },
  RATE: {
    INVALID_FORMAT: 'rate is required',
    MIN_VALUE: `min rate is ${RATE.MIN}`,
    MAX_VALUE: `max rate is ${RATE.MAX}`
  },
  OFFER_ID: {
    INVALID_FORMAT: 'offerId field must be a valid id'
  },
  USER_ID: {
    INVALID_FORMAT: 'userId field must be a valid id'
  },
} as const;
