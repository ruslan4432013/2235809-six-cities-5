import { injectable } from 'inversify';
import { Controller } from './controller.interface.js';
import { Router, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Route } from '../types/route.interface.js';
import { Logger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_CONTENT_TYPE } from './controller.constant.js';


@injectable()
export abstract class BaseController implements Controller {
  public readonly router: Router = Router();

  constructor(
    protected readonly logger: Logger
  ) {
  }

  public addRoute(route: Route): void {
    const wrappedAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrappedAsyncHandler] : wrappedAsyncHandler;
    this.router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContend<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
