import type { RequestHandler } from 'express';
import express from 'express';
import { getAllWidgets, createWidget, getWidget, updateWidget, deleteWidget } from '../controllers/widgets.js';

const router = express.Router()

// RequestHandler assertion is necessary due to argument being AuthenticatedRequest instead of Request
// TODO: probably a better way to do this
router.route('/')
  .get(getAllWidgets as RequestHandler)
  .post(createWidget as RequestHandler);
  
router.route('/:id')
  .get(getWidget as RequestHandler)
  .put(updateWidget as RequestHandler)
  .delete(deleteWidget as RequestHandler);

export default router;