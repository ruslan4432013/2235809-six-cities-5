import { ExceptionFilter } from './exception-filter.interface.js';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';
import { ValidationError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../helpers/index.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }
    this.logger.error(`[ValidationException]: ${error.message}`, error);
    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }

}
