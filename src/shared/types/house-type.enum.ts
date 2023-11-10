export enum HouseType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}


const houses = new Set<string>([HouseType.Apartment, HouseType.Room, HouseType.Hotel, HouseType.House]);
const isHouseType = (value: unknown): value is HouseType => typeof value === 'string' && houses.has(value);
export const getHouseType = (value: unknown): HouseType => {
  if (!isHouseType(value)) {
    throw new Error(`Incorrect house type ${value}`);
  }
  return value;
};
