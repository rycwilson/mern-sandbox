// https://dev.to/asjadanis/parsing-env-with-typescript-3jjm

import { Request } from 'express';

type RegisteredUser = { id: string, name: string }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      MONGO_URI: string,
      JWT_SECRET: string,
      JWT_EXPIRES_IN: string
    }
  }

  namespace Express {
    interface Request { 
      user?: RegisteredUser 
    }
  }

  interface AuthenticatedRequest extends Request {
    user: RegisteredUser
  }
}

export {}