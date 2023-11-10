import { Config, RestSchema } from '../../config/index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';
import { inject, injectable } from 'inversify';
import { DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS } from './path-transformer.constant.js';
import { getFullServerPath, isObject } from '../../../helpers/index.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../../../../rest/index.js';


@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('PathTransformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const processObject = (obj: Record<string, unknown>) => {
      for (const key in obj) {
        if (key in obj) {
          const value = obj[key];
          if (isObject(value)) {
            processObject(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_FILES_ROUTE;
            const uploadPath = STATIC_UPLOAD_ROUTE;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');
            const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;

            obj[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    };
    processObject(data);
    return data;
  }
}
