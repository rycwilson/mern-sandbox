import { asyncWrapper } from '../middleware/async.js';
import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = asyncWrapper(async (req, res) => {
  // mongoose will validate
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Name, email, and password are required')
  // }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: { name: user.fullName }, token: user.createJWT() });
});

const login = asyncWrapper(async (req, res) => {
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
});

export { register, login };