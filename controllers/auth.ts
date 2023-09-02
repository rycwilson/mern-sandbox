import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  console.log(req.body)
  // mongoose will validate
  // const { name, email, password } = req.body
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Name, email, and password are required')
  // }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token: user.createJWT() });
};

const login = async (req, res) => {
  console.log(req.headers);
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Email and password are required');
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('Invalid credentials');
  const passwordIsCorrect = await user.comparePassword(password);
  if (passwordIsCorrect) {
    return res.status(StatusCodes.OK).json({ user: { name: user.name }, token: user.createJWT() });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
};

export { register, login };