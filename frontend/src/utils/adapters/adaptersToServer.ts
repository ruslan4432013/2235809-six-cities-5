import { getTime } from '../utils';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UserType } from '../../const';
import { Comment, CommentAuth, NewOffer, Offer, Type, UserRegister } from '../../types/types';
import { CreateOfferDto } from '../../dto/offer/create-offer.dto';
import { Facilities } from '../../dto/offer/types';
import { CreateCommentDto } from '../../dto/comment/create-comment.dto';
import { OfferDto } from '../../dto/offer/offer.dto';
import { CommentDto } from '../../dto/comment/comment.dto';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    type: UserType.Regular
  });


const isFacility = (value: string): value is Facilities => (value in Object.values(Facilities));

export const adaptCreateOfferToServer =
  (offer: NewOffer): CreateOfferDto => ({
    title: offer.title,
    city: offer.city.name,
    coords: {
      latitude: offer.city.location.latitude.toString(),
      longitude: offer.city.location.longitude.toString()
    },
    roomsCount: offer.bedrooms,
    rentPrice: offer.price,
    preview: offer.previewImage,
    postDate: new Date(getTime()),
    isPremium: offer.isPremium,
    images: offer.images,
    description: offer.description,
    houseType: offer.type,
    guestsCount: offer.maxAdults,
    facilities: offer.goods as Facilities[]
  });

export const mapDtoToOffer = (dto: OfferDto): Offer => ({
  title: dto.title,
  city: {
    name: dto.city,
    location: { longitude: +dto.coords.longitude, latitude: +dto.coords.latitude }
  },
  bedrooms: dto.guestsCount,
  description: dto.description,
  goods: dto.facilities,
  images: dto.images,
  host: {
    email: dto.author.email,
    type: dto.author.type as UserType,
    name: dto.author.name,
    avatarPath: dto.author.avatarPath
  },
  type: dto.houseType as Type,
  rating: dto.rating,
  id: dto.id,
  isPremium: dto.isPremium,
  location: { longitude: +dto.coords.longitude, latitude: +dto.coords.latitude },
  maxAdults: dto.guestsCount,
  price: dto.rentPrice,
  previewImage: dto.preview,
  isFavorite: dto.isFavorite
});

export const adaptCreateCommentToServer =
  (comment: CommentAuth): CreateCommentDto => ({
    offerId: comment.id,
    text: comment.comment,
    rating: comment.rating
  });

export const mapDtoToComment = (dto: CommentDto): Comment => ({
  comment: dto.text,
  user: {
    name: dto.user.name,
    avatarPath: dto.user.avatarPath,
    type: dto.user.type as UserType,
    email: dto.user.email
  },
  rating: dto.rating,
  id: dto.id,
  date: dto.postDate
});

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };

export const adaptImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('image', file);
    return formData;
  };
