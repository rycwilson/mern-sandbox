import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.ts';
import Widget from '../models/widget.ts';

export async function getCurrentUser(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user.id }).select('-_id firstName lastName email role');
  console.log(user)
  res.status(StatusCodes.OK).json({ user });
}

export async function getAppStats(req: Request, res: Response) {
  const users = await User.countDocuments();
  const widgets = await Widget.countDocuments();
  res.status(StatusCodes.OK).json({ users, widgets });
}

export async function updateUser(req: Request, res: Response) {
  const user = { ...req.body };
  delete user.password;   // don't allow password udpate here 
  const updatedUser = await User.findByIdAndUpdate(req.user.id, user);
  res.status(StatusCodes.OK).json({ msg: 'get current user' });
}