import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validateRegistration } from '../middleware/validation.ts';
import { login, register } from '../controllers/authController.ts';

const router = Router()
  .post('/register', validateRegistration, asyncWrapper(register))
  .post('/login', asyncWrapper(login));

export default router;