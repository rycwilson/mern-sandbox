import { asyncWrapper } from '../middleware/async.js';
import { StatusCodes } from 'http-status-codes';
import Widget from '../models/widget.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const index = asyncWrapper(async (req: AuthenticatedRequest, res) => {
  const widgets = await Widget.find({ createdBy: req.user.id }).sort('createdAt');
  res.status(StatusCodes.OK).json({ widgets, count: widgets.length });
});

const show = asyncWrapper(async (req: AuthenticatedRequest, res) => {
  const { user: { id: userId }, params: { id: widgetId }} = req;
  const widget = await Widget.findOne({ _id: widgetId, createdBy: userId }).select('-createdAt -updatedAt');
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`);
  res.status(StatusCodes.OK).json({ widget });
});

const create = asyncWrapper(async (req: AuthenticatedRequest, res) => {
  const widget = await Widget.create({ ...req.body, createdBy: req.user.id });
  res.status(StatusCodes.CREATED).json({ widget });
});


const update = asyncWrapper(async (req: AuthenticatedRequest, res) => {
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
});

const destroy = asyncWrapper(async (req: AuthenticatedRequest, res) => {
  const { user: { id: userId }, params: { id: widgetId }} = req;
  const widget = await Widget.findOneAndDelete({ _id: widgetId, createdBy: userId });
  if (!widget) throw new NotFoundError(`No widget with id: ${widgetId}`);
  res.status(200).send();
});

export { index, show, create, update, destroy }