import { PipelineStage } from 'mongoose';

export const authorsLookupPipeline: PipelineStage = {
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
};
