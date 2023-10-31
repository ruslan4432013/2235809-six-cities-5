import { PipelineStage } from 'mongoose';
import { SortType } from '../../../types/index.js';

export const sortDownPipeline: PipelineStage = {
  $sort: {
    createdAt: SortType.Down
  }
};
