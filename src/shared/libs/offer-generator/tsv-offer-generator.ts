import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import dayjs from 'dayjs';
import { WEEKS } from './offer-generator.constant.js';
import { GUEST_COUNT_LENGTH, RENT_PRICE, ROOMS_COUNT_LENGTH } from '../../modules/offer/offer.constant.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  private getRandomDate(): string {
    return dayjs()
      .subtract(generateRandomValue(WEEKS.FIRST, WEEKS.LAST), 'day')
      .toISOString();
  }

  private getRandomFlag() {
    return getRandomItem(['Yes', 'No']);
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
    const houseType = getRandomItem(this.mockData.houseTypes);
    const roomsCount = generateRandomValue(ROOMS_COUNT_LENGTH.MIN, ROOMS_COUNT_LENGTH.MAX).toString();
    const guestsCount = generateRandomValue(GUEST_COUNT_LENGTH.MIN, GUEST_COUNT_LENGTH.MAX).toString();
    const price = generateRandomValue(RENT_PRICE.MIN, RENT_PRICE.MAX).toString();
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const user = this.getRandomUser();
    const coords = this.getRandomCoords();

    return [
      title, description, createdAt,
      city, preview, images,
      isPremiumFlag,
      houseType, roomsCount, guestsCount,
      price, facilities, user, coords
    ].join('\t');
  }
}
