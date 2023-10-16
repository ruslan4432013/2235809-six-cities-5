import { parseUser } from './user.js';
import { getHouseType, HouseOffer } from '../types/index.js';
import { parseCoords } from './coords.js';
import { parseFacilities } from './facility.js';

export const createOffer = (offerData: string): HouseOffer => {
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    images,
    isPremiumFlag,
    houseType,
    roomsCountRaw,
    guestsCountRaw,
    priceRaw,
    facilitiesRaw,
    userRaw,
    coordsRaw
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    preview,
    images: images.split(';'),
    isPremium: isPremiumFlag === 'Yes',
    houseType: getHouseType(houseType),
    roomsCount: Number.parseInt(roomsCountRaw, 10),
    guestsCount: Number.parseInt(guestsCountRaw, 10),
    rentPrice: Number.parseInt(priceRaw, 10),
    facilities: parseFacilities(facilitiesRaw),
    author: parseUser(userRaw),
    coords: parseCoords(coordsRaw)
  };
};
