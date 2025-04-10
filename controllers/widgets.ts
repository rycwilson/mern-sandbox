import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Widget from '../models/widget.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

export async function index(req: AuthenticatedRequest, res: Response) {
  const widgets = await Widget.find({ createdBy: req.user.id }).sort('createdAt');
  res.status(StatusCodes.OK).json({ widgets, count: widgets.length });
};

export async function show(req: AuthenticatedRequest, res: Response) {
  const { user: { id: userId }, params: { id: widgetId } } = req;
  const widget = await Widget.findOne({ _id: widgetId, createdBy: userId }).select('-createdAt -updatedAt');
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`);
  res.status(StatusCodes.OK).json({ widget });
};

export async function create(req: AuthenticatedRequest, res: Response) {
  const widget = await Widget.create({ ...req.body, createdBy: req.user.id });
  res.status(StatusCodes.CREATED).json({ widget });
};

export async function update(req: AuthenticatedRequest, res: Response) {
  const { user: { id: userId }, body: { company, position }, params: { id: widgetId } } = req;
  if (!company || !position) throw new BadRequestError('Missing required fields');

  // add option overwrite: true if a PUT with missing attributes should remove or reset those attributes
  const widget = await Widget.findOneAndUpdate(
    { _id: widgetId, createdBy: userId }, 
    req.body, 
    { new: true, runValidators: true }
  );
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`);
  res.status(200).json({ widget });
};

export async function destroy(req: AuthenticatedRequest, res: Response) {
  const { user: { id: userId }, params: { id: widgetId } } = req;
  const widget = await Widget.findOneAndDelete({ _id: widgetId, createdBy: userId });
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`);
  res.status(200).send();
};