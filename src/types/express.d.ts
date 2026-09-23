import { Payload } from 'src/modules/auth/auth.service';

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export {};
