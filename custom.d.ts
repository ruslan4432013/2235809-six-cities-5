import { TokenPayload } from './src/shared/modules/auth';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}

declare global {

  interface String {
    bold: string,
    blue: string,
    yellow: string,
    red: string
    green: string
  }
}


export {};
