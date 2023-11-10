import mongoose, { PipelineStage } from 'mongoose';

export const getCurrentUserLookupPipeline = (userId?: string): PipelineStage => ({
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
});
