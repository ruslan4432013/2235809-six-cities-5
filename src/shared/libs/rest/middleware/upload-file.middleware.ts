import { Middleware } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

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
        const filename = randomUUID();
        callback(null, `${filename}${fileExtension}`);
      }
    });
    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
