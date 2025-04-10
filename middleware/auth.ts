import config from '../config/config.js';
import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

export default function(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authorization header');
  }
  const token = authHeader.split(' ')[1];
  try {
    const jwtPayload = jwt.verify(token, config.JWT_SECRET);
    
    // Narrow the type of payload (depending on how jwt.sign was called, jwt.verify may return an object or primitive)
    if (typeof jwtPayload !== 'object' || jwtPayload === null) {
      throw new UnauthenticatedError('Invalid JWT payload');
    }
    
    // Now safely cast payload to JwtPayload
    const payload = jwtPayload as JwtPayload;
    
    //const user = User.findById(payload.userId).select('-password')
    //req.user = user
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError('Not authorized');
  }
}