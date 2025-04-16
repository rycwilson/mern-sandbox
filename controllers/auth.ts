import type { Request, Response } from 'express';
import User from '../models/user.ts';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.ts';

export async function register(req: Request, res: Response) {
  // mongoose will validate
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Name, email, and password are required')
  // }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: { name: user.fullName }, token: user.createJWT() });
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Email and password are required');
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('Invalid credentials');
  const passwordIsCorrect = await user.comparePassword(password);
  if (passwordIsCorrect) {
    return res.status(StatusCodes.OK).json({ user: { name: user.fullName }, token: user.createJWT() });
  } else {
    console.log('invalid credentials')
    throw new UnauthenticatedError('Invalid credentials');
  }
};