import type { Request, RequestHandler } from 'express';

export function asyncWrapper<T extends Request = Request>(handler: AsyncRequestHandler<T>): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req as T, res, next);
    } catch (err) {
      next(err);
    } 
  }
};