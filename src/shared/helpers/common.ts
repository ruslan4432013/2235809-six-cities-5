import { ClassConstructor, plainToInstance } from 'class-transformer';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(arr: T[]): T[] => {
  const count = generateRandomValue(1, arr.length - 1);

  const shuffled = arr.slice(); // Создаем копию массива
  let currentIndex = shuffled.length;
  let randomIndex, temporaryValue;

  // Перемешиваем элементы массива (алгоритм тасования Фишера-Йетса)
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  // Возвращаем первые `count` элементов
  return shuffled.slice(0, count);
};

export const getRandomItem = <T>(items: T[]) => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(
  someDto,
  plainObject,
  { excludeExtraneousValues: true }
);

export const createErrorObject = (message: string) => ({
  error: message,
});
