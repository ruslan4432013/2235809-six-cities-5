import { RATE, TEXT_LENGTH } from '../comment.constants.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min length is ${TEXT_LENGTH.MIN}, max is ${TEXT_LENGTH.MAX}`
  },
  rate: {
    invalidFormat: 'rate is required',
    minValue: `min rate is ${RATE.MIN}`,
    maxValue: `max rate is ${RATE.MAX}`
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
