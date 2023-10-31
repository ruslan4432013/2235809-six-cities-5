import { inject, injectable } from 'inversify';
import { OfferFindOptions, OfferFindOptionsById, OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import mongoose, { PipelineStage } from 'mongoose';
import { UserEntity } from '../user/index.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result.populate(['authorId']);
  }

  public findByTitle(title: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findOne({ title })
      .populate(['authorId'])
      .exec();
  }

  public async findById(options: OfferFindOptionsById): Promise<DocumentType<OfferEntity> | null> {
    const { offerId, userId } = options;
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
        $lookup: {
          from: 'users',
          as: 'user',
          pipeline: [
            {
              $match: {
                '_id': {
                  $eq: new mongoose.Types.ObjectId(userId)
                }
              }
            },
            {
              $project: {
                favoriteOffers: { $arrayElemAt: ['$favoriteOffers', 0] },
              }
            },
          ]
        }
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authors',
          pipeline: [
            {
              $addFields: {
                id: { $toString: '$_id' }
              }
            }
          ]
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          favoriteOffers: '$user.favoriteOffers',
          authorId: { $arrayElemAt: ['$authors', 0] },
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
            $in: ['$_id', '$user.favoriteOffers']
          }
        }
      },
      {
        $unset: ['comments', 'authors']
      },
      {
        $match: {
          '_id': {
            $eq: new mongoose.Types.ObjectId(offerId)
          }
        }
      },
      {
        $sort: {
          createdAt: SortType.Down
        }
      },
    ];
    const offers = await this.offerModel
      .aggregate(pipeline)
      .exec();
    return offers[0];
  }

  public async find(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]> {
    const { userId, limit = DEFAULT_OFFER_COUNT } = options ?? {};
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
        $lookup: {
          from: 'users',
          as: 'user',
          pipeline: [
            {
              $match: {
                '_id': {
                  $eq: new mongoose.Types.ObjectId(userId)
                }
              }
            },
            {
              $project: {
                favoriteOffers: { $arrayElemAt: ['$favoriteOffers', 0] },
              }
            },
          ]
        }
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authors',
          pipeline: [
            {
              $addFields: {
                id: { $toString: '$_id' }
              }
            }
          ]
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          favoriteOffers: '$user.favoriteOffers',
          authorId: { $arrayElemAt: ['$authors', 0] },
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
            $in: ['$_id', '$user.favoriteOffers']
          }
        }
      },
      {
        $unset: ['comments', 'authors']
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

  public updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['authorId'])
      .exec();
  }

  public findPremium(options?: OfferFindOptions): Promise<DocumentType<OfferEntity>[]> {
    const { limit = DEFAULT_PREMIUM_OFFER_COUNT, userId } = options ?? {};
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
        $lookup: {
          from: 'users',
          as: 'user',
          pipeline: [
            {
              $match: {
                '_id': {
                  $eq: new mongoose.Types.ObjectId(userId)
                }
              }
            },
            {
              $project: {
                favoriteOffers: { $arrayElemAt: ['$favoriteOffers', 0] },
              }
            },
          ]
        }
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authors',
          pipeline: [
            {
              $addFields: {
                id: { $toString: '$_id' }
              }
            }
          ]
        },
      },
      {
        $match: {
          'isPremium': true
        }
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          favoriteOffers: '$user.favoriteOffers',
          authorId: { $arrayElemAt: ['$authors', 0] },
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
            $in: ['$_id', '$user.favoriteOffers']
          }
        }
      },
      {
        $unset: ['comments', 'authors']
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

  public async findFavorite(userId: string, limit: number): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId);
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authors',
          pipeline: [
            {
              $addFields: {
                id: { $toString: '$_id' }
              }
            }
          ]
        },
      },
      {
        $addFields: {
          authorId: { $arrayElemAt: ['$authors', 0] },
          isFavorite: true
        }
      },
      {
        $match: {
          '_id': {
            $in: user?.favoriteOffers
          }
        }
      },
      { $limit: limit }
    ];
    return this.offerModel.aggregate(pipeline).exec();
  }
}
