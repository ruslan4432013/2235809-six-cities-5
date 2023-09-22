import {getUserType, UserType} from './user-type.enum.js';

export type User = {
  name: string
  email: string
  avatar: string
  password: string
  userType: UserType
}

export const parseUser = (value: unknown): User => {
  if (!(typeof value === 'string')) {
    throw new Error(`Incorrect value ${value}`);
  }
  const divided = value.split(';').map((word) => word.trim());
  if (divided.length !== 5) {
    throw new Error(`Incorrect User ${value}`);
  }
  const [name, email, avatar, password, userTypeRaw] = divided;
  return ({name, email, avatar, password, userType: getUserType(userTypeRaw)});
};
