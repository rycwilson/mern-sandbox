import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authorization header');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //const user = User.findById(payload.userId).select('-password')
    //req.user = user
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError('Not authorized');
  }
}

export default auth;