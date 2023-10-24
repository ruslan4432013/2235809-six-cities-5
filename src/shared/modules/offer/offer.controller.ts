import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getDetailOffer });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.updateOffer });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response): Promise<void> {
    const existOffer = await this.offerService.findByTitle(body.title);
    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.title}» exists.`,
        'OfferController'
      );
    }
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async getDetailOffer(
    req: Request,
    res: Response
  ) {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async deleteOffer(
    req: Request,
    res: Response
  ) {
    const { offerId } = req.params;
    const existOffer = await this.offerService.deleteById(offerId);
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }
    this.noContend(res, fillDTO(OfferRdo, existOffer));
  }

  public async updateOffer(
    req: UpdateOfferRequest,
    res: Response
  ) {
    const { offerId } = req.params;
    if (typeof offerId !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with id ${offerId} incorrect`,
        'OfferController'
      );
    }
    const existOffer = await this.offerService.updateById(offerId, req.body);
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }
    this.noContend(res, fillDTO(OfferRdo, existOffer));
  }
}
