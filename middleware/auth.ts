import config from '../config/config.js';
import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authorization header');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    //const user = User.findById(payload.userId).select('-password')
    //req.user = user
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError('Not authorized');
  }
}

export default auth;