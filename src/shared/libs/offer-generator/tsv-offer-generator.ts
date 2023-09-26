import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/mock-server-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';
import dayjs from 'dayjs';

type Flag = 'Да' | 'Нет'

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  private getRandomDate(): string {
    return dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
  }

  private getRandomFlag(): Flag {
    return getRandomItem<Flag>(['Да', 'Нет']);
  }

  private getRandomUser(): string {
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);
    return [name, email, avatar, password, userType].join(';');
  }

  private getRandomCoords(): string {
    const longitude = getRandomItem(this.mockData.longitudes);
    const latitudes = getRandomItem(this.mockData.latitudes);
    return [longitude, latitudes].join(';');
  }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const createdAt = this.getRandomDate();
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremiumFlag = this.getRandomFlag();
    const isFavoritesFlag = this.getRandomFlag();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const houseType = getRandomItem(this.mockData.houseTypes);
    const roomsCount = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const user = this.getRandomUser();
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const coords = this.getRandomCoords();

    return [
      title, description, createdAt,
      city, preview, images,
      isPremiumFlag, isFavoritesFlag, rating,
      houseType, roomsCount, guestsCount,
      price, facilities, user,
      commentsCount, coords
    ].join('\t');
  }

}
