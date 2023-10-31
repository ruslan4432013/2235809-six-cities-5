import { PipelineStage } from 'mongoose';

export const usersUnwindPipeline: PipelineStage = {
  $unwind: {
    path: '$users',
    preserveNullAndEmptyArrays: true
  }
};
