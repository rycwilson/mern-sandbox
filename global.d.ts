// https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript

import type { Request, Response, NextFunction } from 'express';
import { type ReactNode } from 'react';

type RegisteredUser = { id: string, role: string, name: string }

declare global {
  type ModalContent = { title: string, body: ReactNode } | null;
  
  // interface Window { MyNamespace: any }
  // window.MyNamespace = window.MyNamespace || {}
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      MONGO_URI: string,
      JWT_SECRET: string,
      JWT_EXPIRES_IN: string
    }
  }

  // https://blog.logrocket.com/extend-express-request-object-typescript/
  namespace Express {
    interface Request { 
      user?: RegisteredUser 
    }
  }

  interface AsyncRequestHandler<T extends Request = Request> {
    (req: T, res: Response, next: NextFunction): Promise<any>;
  }

  interface AuthenticatedRequest extends Request {
    user: RegisteredUser
  }
}

export {}