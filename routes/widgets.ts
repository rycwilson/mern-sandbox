import { asyncWrapper } from '../middleware/async.js';
import { Router } from 'express';
import { index, show, create, update, destroy } from '../controllers/widgets.js';
import { logCreatedWidget } from '../middleware/misc.js';

const router = Router();

router.route('/')
  .get(asyncWrapper<AuthenticatedRequest>(index))
  .post(logCreatedWidget, asyncWrapper<AuthenticatedRequest>(create));
  
router.route('/:id')
  .get(asyncWrapper<AuthenticatedRequest>(show))
  .put(asyncWrapper<AuthenticatedRequest>(update))
  .delete(asyncWrapper<AuthenticatedRequest>(destroy));

export default router;