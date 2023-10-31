import { PipelineStage } from 'mongoose';

export const commentLookupPipline: PipelineStage = {
  $lookup: {
    from: 'comments',
    localField: '_id',
    foreignField: 'offerId',
    as: 'comments',
  },
};
