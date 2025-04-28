import { Router } from 'express';
import { authorizeRoles } from '../middleware/auth.ts';
import { updateUserValidation } from '../models/user.ts';
import { getCurrentUser, getAppStats, updateUser } from '../controllers/usersController.ts';

const router = Router()
  .get('/current-user', getCurrentUser)
  .get('/admin/app-stats', authorizeRoles('admin'), getAppStats)
  .patch('/update-user', updateUserValidation, updateUser);

export default router;