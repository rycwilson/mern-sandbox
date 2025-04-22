import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validateIdFormat } from '../middleware/validation.ts';
import { logCreatedWidget } from '../middleware/misc.ts';
import { validateWidgetAccess, validateWidgetInput } from '../models/widget.ts';
import { index, show, create, update, destroy } from '../controllers/widgetsController.ts';

const router = Router();

router.route('/')
  .get(asyncWrapper<AuthenticatedRequest>(index))
  .post(validateWidgetInput, logCreatedWidget, asyncWrapper<AuthenticatedRequest>(create));
  
router
  .use('/:id', validateIdFormat, validateWidgetAccess)
  .route('/:id')
    .get(asyncWrapper<AuthenticatedRequest>(show))
    .put(validateWidgetInput, asyncWrapper<AuthenticatedRequest>(update))
    .delete(asyncWrapper<AuthenticatedRequest>(destroy));

export default router;