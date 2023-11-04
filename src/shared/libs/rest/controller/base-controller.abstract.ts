import { inject, injectable } from 'inversify';
import { Controller } from './controller.interface.js';
import { Router, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Route } from '../types/route.interface.js';
import { Logger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_CONTENT_TYPE } from './controller.constant.js';
import { PathTransformer } from '../transform/path-transformer.js';
import { Component } from '../../../types/index.js';
import { isObject } from '../../../helpers/index.js';


@injectable()
export abstract class BaseController implements Controller {
  public readonly router: Router = Router();

  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

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
    const modifiedData = isObject(data) ? this.pathTransformer.execute(data) : data;
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
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
