import { PipelineStage } from 'mongoose';

export const unsetCommentsAuthorsPipeline: PipelineStage = {
  $unset: ['comments', 'authors']
};
