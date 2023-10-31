import { Middleware } from './middleware.interface.js';
import { DocumentExists } from '../../../types/document-exists.interface.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';


export class DocumentExistsMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly paramName: string,
    private requestValue: keyof Request = 'params'
  ) {
  }

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = req[this.requestValue][this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }
    next();
  }
}
