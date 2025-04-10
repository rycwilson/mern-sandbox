import type { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler<T = Request> = (req: T, res: Response, next: NextFunction) => Promise<any>;

export function asyncWrapper<T = Request>(fn: AsyncRequestHandler<T>) {
  return async (req: T, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    } 
  }
};