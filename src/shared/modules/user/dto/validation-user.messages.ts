import { USER_FIELDS_LENGTH } from '../user.constant.js';

export const CREATE_USER_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  AVATAR_PATH: {
    INVALID_FORMAT: 'avatarPath is required',
  },
  NAME: {
    INVALID_FORMAT: 'name is required',
    LENGTH_FIELD: `min length is ${USER_FIELDS_LENGTH.NAME.MIN}, max is ${USER_FIELDS_LENGTH.NAME.MAX}`,
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    LENGTH_FIELD: `min length for password is ${USER_FIELDS_LENGTH.PASSWORD.MIN}, max is ${USER_FIELDS_LENGTH.PASSWORD.MAX}`
  },
  TYPE: {
    INVALID_FORMAT: 'type must be "Обычный" или "Pro"',
  }
} as const;
