import {getUserType, User} from '../types/index.js';

export const parseUser = (value: unknown): User => {
  if (!(typeof value === 'string')) {
    throw new Error(`Incorrect User ${value}`);
  }
  const divided = value.split(';').map((word) => word.trim());
  if (divided.length !== 5) {
    throw new Error(`Incorrect User ${value}`);
  }
  const [name, email, avatarPath, password, userTypeRaw] = divided;
  return ({name, email, avatarPath, password, type: getUserType(userTypeRaw)});
};
