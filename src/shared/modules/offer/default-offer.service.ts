import { inject, injectable } from 'inversify';
import { OfferFindOptions, OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { PipelineStage } from 'mongoose';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { UserService } from '../user/user-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserService) private readonly userService: UserService
  ) {
  }

  public async findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userService.findById(userId);
    const favoriteOffers = user?.favoriteOffers;
    return this.offerModel.find({ _id: { $in: favoriteOffers } });
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['authorId'])
      .exec();
  }

  public async find(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]> {
    const { userId, limit = DEFAULT_OFFER_COUNT } = options ?? {};
    const user = await this.userService.findById(userId);
    const favoriteOffers = user?.favoriteOffers || [];
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          rating: {
            $divide: [
              {
                $reduce: {
                  input: '$comments',
                  initialValue: 0,
                  in: { $add: ['$$value', '$$this.rating'] },
                }
              },
              {
                $cond: [
                  { $ne: [{ $size: '$comments' }, 0] },
                  { $size: '$comments' },
                  1
                ]
              }
            ]
          },
          commentsCount: {
            $size: '$comments'
          },
          isFavorite: {
            $in: ['$_id', favoriteOffers]
          }
        }
      },
      {
        $unset: 'comments'
      },
      {
        $sort: {
          createdAt: SortType.Down
        }
      },
      {
        $limit: limit
      }
    ];

    return this.offerModel.aggregate(pipeline).exec();
  }

  public deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId }) !== null);
  }

  public findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentsCount: SortType.Down })
      .limit(count)
      .populate(['authorId'])
      .exec();
  }

  public updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['authorId'])
      .exec();
  }

  public findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find();
  }
}
