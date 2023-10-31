import { PipelineStage } from 'mongoose';

export const addFieldsPipeline: PipelineStage = {
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
};
