import { PipelineStage } from 'mongoose';
import { commentLookupPipline } from './comment-lookup.pipline.js';
import { getCurrentUserLookupPipeline } from './user-lookup.pipline.js';
import { usersUnwindPipeline } from './users-unwind.pipeline.js';
import { authorsLookupPipeline } from './authors-lookup.pipeline.js';
import { addFieldsPipeline } from './add-fields.pipeline.js';
import { unsetCommentsAuthorsPipeline } from './unset-comments-authors.pipeline.js';
import { sortDownPipeline } from './sort-down.pipeline.js';
import { getLimitPipeline } from './get-limit.pipeline.js';


type Options = {
  userId?: string,
  limit?: number
}
export const getDefaultFindOffersPipeline = ({ userId, limit }: Options): PipelineStage[] => {
  const pipelines = [
    commentLookupPipline,
    getCurrentUserLookupPipeline(userId),
    usersUnwindPipeline,
    authorsLookupPipeline,
    addFieldsPipeline,
    unsetCommentsAuthorsPipeline,
    sortDownPipeline,
  ];

  if (limit) {
    pipelines.push(getLimitPipeline(limit));
  }
  return pipelines;
};
