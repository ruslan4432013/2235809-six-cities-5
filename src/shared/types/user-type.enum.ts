export enum UserType {
  Default = 'Обычный',
  Pro = 'Pro'
}

const userTypes: string[] = [UserType.Default, UserType.Pro];

const isUserType = (value: unknown): value is UserType =>
  typeof value === 'string' && userTypes.includes(value);


export const getUserType = (value: unknown): UserType => {
  if (!isUserType(value)) {
    throw new Error(`Unknown user type ${value}`);
  }
  return value;
};
