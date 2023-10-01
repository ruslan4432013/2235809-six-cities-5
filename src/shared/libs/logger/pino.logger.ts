import {Logger as PinoInstance, pino, transport} from 'pino';
import {Logger} from './logger.interface.js';
import {injectable} from 'inversify';
import {getCurrentModuleDirectoryPath} from '../../helpers/index.js';
import {resolve} from 'node:path';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../..', logFilePath);
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: {destination},
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {}
        }
      ]
    });
    this.logger = pino({}, multiTransport);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

}
