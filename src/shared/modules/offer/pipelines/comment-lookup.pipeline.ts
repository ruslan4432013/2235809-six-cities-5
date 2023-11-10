import { PipelineStage } from 'mongoose';

export const commentLookupPipeline: PipelineStage = {
  $lookup: {
    from: 'comments',
    localField: '_id',
    foreignField: 'offerId',
    as: 'comments',
  },
};
