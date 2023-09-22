import {HouseType} from './house-type.enum.js';
import {User} from './user.type.js';
import {Coords} from './coords.type.js';
import {Facilities} from './facilities.type.js';


export type HouseOffer = {
  title: string
  description: string
  postDate: Date
  city: string
  preview: string
  images: string[]
  isPremium: boolean
  isFavorites: boolean
  rating: number
  houseType: HouseType
  roomsCount: number
  guestsCount: number
  commentsCount: number
  rentPrice: number
  facilities: Facilities[]
  author: User
  coords: Coords
}
