import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';

export type FavoriteOfferRequest = Request<RequestParams, RequestBody, { offerId: string }>
