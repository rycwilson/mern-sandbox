import express from 'express';
import { getAllWidgets, createWidget, getWidget, updateWidget, deleteWidget } from '../controllers/widgets.js';

const router = express.Router()

router.route('/')
  .get(getAllWidgets)
  .post(createWidget);
  
router.route('/:id')
  .get(getWidget)
  .put(updateWidget)
  .delete(deleteWidget);

export default router;