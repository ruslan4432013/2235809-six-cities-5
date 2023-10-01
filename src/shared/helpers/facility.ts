import {Facilities} from '../types/facilities.type.js';

const isFacility = (value: unknown): value is Facilities =>
  typeof value === 'string'
  && [
    Facilities.Breakfast,
    Facilities.AirConditioning,
    Facilities.LaptopFriendlyWorkspace,
    Facilities.BabySeat,
    Facilities.Washer,
    Facilities.Towels,
    Facilities.Fridge,
    ''
  ].includes(value);

const getFacility = (value: unknown): Facilities => {
  if (!isFacility(value)) {
    throw new Error(`Unknown facility ${value}`);
  }
  return value;
};

export const parseFacilities = (value: string): Facilities[] => value.split(';').map(getFacility);
