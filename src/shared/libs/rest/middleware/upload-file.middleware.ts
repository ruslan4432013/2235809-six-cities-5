import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { ALLOWED_AVATAR_EXTENSIONS } from '../../../modules/user/index.js';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extname(file.originalname);
        console.log({ fileExtension, file });
        if (ALLOWED_AVATAR_EXTENSIONS.includes(fileExtension)) {
          const filename = randomUUID();
          return callback(null, `${filename}${fileExtension}`);
        }
        return callback(new HttpError(
          StatusCodes.BAD_REQUEST,
          `Wrong file extension, allowed extensions: ${ALLOWED_AVATAR_EXTENSIONS}`,
        ), '');
      }
    });
    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
