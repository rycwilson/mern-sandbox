import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Widget from '../models/widget.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const getAllWidgets = async (req: Request, res: Response) => {
  const widgets = await Widget.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ widgets, count: widgets.length });
};

const createWidget = async (req: Request, res: Response) => {
  const widget = await Widget.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ widget });
};

const getWidget = async (req: Request, res: Response) => {
  const { user: { userId }, params: { id: widgetId }} = req;
  const widget = await Widget.findOne({ _id: widgetId, createdBy: userId }).select('-createdAt -updatedAt');
  if (!widget) throw new NotFoundError(`No job with id: ${widgetId}`, 404);
  res.status(StatusCodes.OK).json({ widget });
};

const updateWidget = async (req: Request, res: Response) => {
  const { user: { userId }, body: { company, position }, params: { id: widgetId } } = req;
  if (!company || !position) throw new BadRequestError('Missing required fields');

  // add option overwrite: true if a PUT with missing attributes should remove or reset those attributes
  const widget = await Widget.findOneAndUpdate(
    { _id: widgetId, createdBy: userId }, 
    req.body, 
    { new: true, runValidators: true }
  );
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`, 404);
  res.status(200).json({ widget });
};

const deleteWidget = async (req: Request, res: Response) => {
  const { user: { userId }, params: { id: widgetId }} = req;
  const widget = await Widget.findOneAndDelete({ _id: widgetId, createdBy: userId });
  if (!widget) throw new ApiError(`No widget with id: ${widgetId}`, 404);
  res.status(200).send();
};

export { getAllWidgets, createWidget, getWidget, updateWidget, deleteWidget };