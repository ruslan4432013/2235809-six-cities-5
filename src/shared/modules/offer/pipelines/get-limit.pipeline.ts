import { PipelineStage } from 'mongoose';

export const getLimitPipeline = (limit: number): PipelineStage => ({
  $limit: limit
});
