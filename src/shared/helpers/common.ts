import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/index.js';
import { ApplicationError } from '../libs/rest/index.js';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(arr: T[]): T[] => {
  const count = generateRandomValue(1, arr.length - 1);
  const shuffled = arr.slice();
  for (let i = shuffled.length; i !== 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

export const getRandomItem = <T>(items: T[]) => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(
  someDto,
  plainObject,
  { excludeExtraneousValues: true }
);

export const createErrorObject = (errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) => ({
  errorType, error, details
});

export const mapValidationErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));

export const getFullServerPath = (host: string, port: number) => `${host}:${port}`;

export const isObject = (value: unknown): value is Record<string, object> =>
  typeof value === 'object' && value !== null;
