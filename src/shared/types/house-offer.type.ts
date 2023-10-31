import {HouseType} from './house-type.enum.js';
import {User} from './user.type.js';
import {Coords} from './coords.type.js';
import {Facilities} from './facilities.type.js';
import { Cities } from './cities.enum.js';


export type HouseOffer = {
  title: string
  description: string
  postDate: Date
  city: Cities
  preview: string
  images: string[]
  isPremium: boolean
  houseType: HouseType
  roomsCount: number
  guestsCount: number
  rentPrice: number
  facilities: Facilities[]
  author: User
  coords: Coords
}
