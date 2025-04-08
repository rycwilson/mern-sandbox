import type { RequestHandler } from 'express';
import { Router } from 'express';
import { index, show, create, update, destroy } from '../controllers/widgets.js';
import { logCreatedWidget } from '../middleware/misc.js';

const router = Router();

// RequestHandler assertion is necessary due to argument being AuthenticatedRequest instead of Request
// TODO: probably a better way to do this
router.route('/')
  .get(index as RequestHandler)
  .post(logCreatedWidget, create as RequestHandler);
  
router.route('/:id')
  .get(show as RequestHandler)
  .put(update as RequestHandler)
  .delete(destroy as RequestHandler);

export default router;