import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private allowedExtensions?: string[],
    private fileCount?: number
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extname(file.originalname);

        if (!this.allowedExtensions || this.allowedExtensions.includes(fileExtension)) {
          const filename = randomUUID();
          return callback(null, `${filename}${fileExtension}`);
        }

        return callback(new HttpError(
          StatusCodes.BAD_REQUEST,
          `Wrong file extension, allowed extensions: ${this.allowedExtensions}`,
        ), '');
      }
    });

    const uploadFileMiddleware = multer({ storage });

    if (this.fileCount && this.fileCount > 1) {
      return uploadFileMiddleware.array(this.fieldName, this.fileCount)(req, res, next);
    }


    return uploadFileMiddleware.single(this.fieldName)(req, res, next);
  }
}
