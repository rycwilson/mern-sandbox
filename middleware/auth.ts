import type { RequestHandler } from 'express';
import config from '../config/config.ts';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError, UnauthorizedError } from '../errors/custom-errors.ts';

export const authenticateUser: RequestHandler = (req, _, next) => {
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

export const authorizeRoles = (...roles: string[]): RequestHandler => {
  return (req, _, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new UnauthorizedError('Not authorized to access this route');
    }
  };
};
