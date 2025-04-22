import type { Request, Response } from 'express';
import config from '../config/config.ts';
import User from '../models/user.ts';
import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors/custom-errors.ts';

export async function register(req: Request, res: Response) {
  const isFirstAccount = await User.countDocuments() === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const user = await User.create(req.body);
  setTokenCookie(res, user);
  res.status(StatusCodes.CREATED).json({ user: { name: user.fullName } });
};

export async function login(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });
  const validCredentials = user && await user.comparePassword(req.body.password);
  if (validCredentials) {
    setTokenCookie(res, user);
    res.status(StatusCodes.OK).json({ user: { name: user.fullName } });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
};

export function logout(req: Request, res: Response) {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: 'User logged out successfully' });
}

function setTokenCookie(res: Response, user: InstanceType<typeof User>): void {
  const token = user.createJWT();
  const expiresInDays = parseInt(config.JWT_EXPIRES_IN, 10);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    secure: config.NODE_ENV === 'production'
  });
}