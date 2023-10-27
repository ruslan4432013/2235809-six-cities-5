import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export type OfferFindOptions = {
  userId?: string,
  limit?: number
}

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;

  find(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;

  findPremium(): Promise<DocumentType<OfferEntity>[]>;

  exists(documentId: string): Promise<boolean>;
}
