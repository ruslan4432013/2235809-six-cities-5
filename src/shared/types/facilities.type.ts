export type Facilities =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge'


const isFacility = (value: unknown): value is Facilities =>
  typeof value === 'string'
  && [
    'Breakfast',
    'Air conditioning',
    'Laptop friendly workspace',
    'Baby seat',
    'Washer',
    'Towels',
    'Fridge'
  ].includes(value);

const getFacility = (value: unknown): Facilities => {
  if (!isFacility(value)) {
    throw new Error(`Unknown facility ${value}`);
  }
  return value;
};

export const getFacilities = (value: unknown): Facilities[] => {
  if (typeof value !== 'string') {
    throw new Error(`Can't parse facility ${value}`);
  }
  return value.split(';').map(getFacility);
};
