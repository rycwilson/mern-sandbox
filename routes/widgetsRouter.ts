import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validateWidgetInput, validateIdParam } from '../middleware/validation.ts';
import { logCreatedWidget } from '../middleware/misc.ts';
import { index, show, create, update, destroy } from '../controllers/widgetsController.ts';

const router = Router();

router.route('/')
  .get(asyncWrapper<AuthenticatedRequest>(index))
  .post(validateWidgetInput, logCreatedWidget, asyncWrapper<AuthenticatedRequest>(create));
  
router.route('/:id')
  .get(validateIdParam, asyncWrapper<AuthenticatedRequest>(show))
  .put(validateWidgetInput, validateIdParam, asyncWrapper<AuthenticatedRequest>(update))
  .delete(validateIdParam, asyncWrapper<AuthenticatedRequest>(destroy));

export default router;