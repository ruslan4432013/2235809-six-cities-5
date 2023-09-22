import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {getHouseType, HouseOffer, parseCoords, parseUser} from '../../types/index.js';
import {getFacilities} from '../../types/facilities.type.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read() {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): HouseOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          createdDate,
          city,
          preview,
          images,
          isPremiumFlag,
          isFavoritesFlag,
          rating,
          houseType,
          roomsCountRaw,
          guestsCountRaw,
          priceRaw,
          facilitiesRaw,
          user,
          commentsCountRaw,
          coordsRaw
        ]) => ({
          title,
          description,
          postDate: new Date(createdDate),
          city,
          preview,
          images: images.split(';'),
          isPremium: isPremiumFlag === 'Да',
          isFavorites: isFavoritesFlag === 'Да',
          rating: Number.parseFloat(rating),
          houseType: getHouseType(houseType),
          roomsCount: Number.parseInt(roomsCountRaw, 10),
          guestsCount: Number.parseInt(guestsCountRaw, 10),
          rentPrice: Number.parseInt(priceRaw, 10),
          facilities: getFacilities(facilitiesRaw),
          author: parseUser(user),
          commentsCount: Number.parseInt(commentsCountRaw, 10),
          coords: parseCoords(coordsRaw)
        }));
  }
}
