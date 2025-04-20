import type { Request, Response } from 'express';
import User from '../models/user.ts';
import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors/custom-errors.ts';

export async function register(req: Request, res: Response) {
  // mongoose will validate
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Name, email, and password are required')
  // }
  const isFirstAccount = await User.countDocuments() === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: { name: user.fullName }, token: user.createJWT() });
};

export async function login(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });
  const validCredentials = user && await user.comparePassword(req.body.password);
  if (validCredentials) {
    return res.status(StatusCodes.OK).json({ user: { name: user.fullName }, token: user.createJWT() });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
};