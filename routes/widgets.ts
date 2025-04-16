import { asyncWrapper } from '../middleware/async.ts';
import { Router } from 'express';
import { index, show, create, update, destroy } from '../controllers/widgets.ts';
import { logCreatedWidget } from '../middleware/misc.ts';

const router = Router();

router.route('/')
  .get(asyncWrapper<AuthenticatedRequest>(index))
  .post(logCreatedWidget, asyncWrapper<AuthenticatedRequest>(create));
  
router.route('/:id')
  .get(asyncWrapper<AuthenticatedRequest>(show))
  .put(asyncWrapper<AuthenticatedRequest>(update))
  .delete(asyncWrapper<AuthenticatedRequest>(destroy));

export default router;