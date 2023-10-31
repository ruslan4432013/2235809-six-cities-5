import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../types/document-exists.interface.js';

export type OfferFindOptions = {
  userId?: string,
  limit?: number
}

export type OfferFindOptionsById = {
  userId?: string,
  offerId: string,
}


export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(options: OfferFindOptionsById): Promise<DocumentType<OfferEntity> | null>;

  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;

  find(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;

  findPremium(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]>;

  findFavorite(userId: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
}
