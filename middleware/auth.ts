import type { Request, Response, NextFunction } from 'express';
import config from '../config/config.ts';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/custom-errors.ts';

export default function(req: Request, res: Response, next: NextFunction) {
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // throw new UnauthenticatedError('Invalid Authorization header');
  // }
  // const token = authHeader.split(' ')[1];
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  try {
    const jwtPayload = jwt.verify(token, config.JWT_SECRET);
    
    // Narrow the type of payload (depending on how jwt.sign was called, jwt.verify may return an object or primitive)
    if (typeof jwtPayload !== 'object' || jwtPayload === null) {
      throw new UnauthenticatedError('Invalid JWT payload');
    }
    
    // Now safely cast payload to JwtPayload
    const payload = jwtPayload as JwtPayload;    
    req.user = { id: payload.id, role: payload.role, name: payload.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError('Invalid credentials');
  }
}