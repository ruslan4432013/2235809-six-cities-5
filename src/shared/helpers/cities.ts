import { Cities } from '../types/index.js';

export const isCity = (value: string): value is Cities => [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
].includes(value);

export const parseCity = (value: string): Cities => {
  if (!isCity(value)) {
    throw new Error('Bad city');
  }
  return value;
};
