import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import {
  DEFAULT_FAVORITE_OFFER_COUNT, DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT
} from './offer.constant.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/bundles/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/bundles/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async index({ tokenPayload, query }: Request, res: Response): Promise<void> {
    const { limit = DEFAULT_OFFER_COUNT } = query ?? {};
    if (Number.isNaN(+limit)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad <<limit>> param.',
        'OfferController'
      );
    }
    const offers = await this.offerService.find({ userId: tokenPayload?.id, limit: +limit });
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response): Promise<void> {
    const existOffer = await this.offerService.findByTitle(body.title);
    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.title}» exists.`,
        'OfferController'
      );
    }
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show(
    req: Request<ParamOfferId>,
    res: Response
  ) {
    const { offerId } = req.params;
    const { tokenPayload } = req;
    const offer = await this.offerService.findById({ offerId, userId: tokenPayload?.id });
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    req: Request,
    res: Response
  ) {
    const { offerId } = req.params;
    const { tokenPayload } = req;

    const offer = await this.offerService.findById({ offerId });
    if (!offer) {
      return;
    }
    if (String(offer.authorId._id) !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'The user who makes the request is not the author',
        'OfferController'
      );
    }
    await this.offerService.deleteById(offerId);
    this.noContend(res, offer);
  }

  public async update(
    { body, params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ) {
    const offer = await this.offerService.findById({ offerId: params.offerId });
    if (String(offer?.authorId._id) !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User not have permission for edit offer ${offer?.title}`,
        'OfferController'
      );
    }
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getPremium(req: Request, res: Response) {
    const { tokenPayload } = req;
    const { limit = DEFAULT_PREMIUM_OFFER_COUNT } = req.query;
    const premiumOffers = await this.offerService.findPremium({ userId: tokenPayload?.id, limit: +limit });
    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async getFavorite({ tokenPayload: { id } }: Request, res: Response) {
    const favoriteOffers = await this.offerService.findFavorite(id, DEFAULT_FAVORITE_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, favoriteOffers));
  }
}
