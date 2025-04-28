import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validator, idFormatValidation } from '../middleware/validation.ts';
import { logCreatedWidget } from '../middleware/misc.ts';
import { createWidgetValidation, accessWidgetValidation, updateWidgetValidation } from '../models/widget.ts';
import { index, show, create, update, destroy } from '../controllers/widgetsController.ts';

const router = Router();

router.route('/')
  .get(asyncWrapper<AuthenticatedRequest>(index))
  .post(validator(createWidgetValidation), logCreatedWidget, asyncWrapper<AuthenticatedRequest>(create));
  
router
  .use('/:id', validator([...idFormatValidation, ...accessWidgetValidation]))
  .route('/:id')
    .get(asyncWrapper<AuthenticatedRequest>(show))
    .put(validator(updateWidgetValidation), asyncWrapper<AuthenticatedRequest>(update))
    .delete(asyncWrapper<AuthenticatedRequest>(destroy));

export default router;