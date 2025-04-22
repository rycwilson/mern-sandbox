import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validateRegistration, validateLogin } from '../models/user.ts';
import { register, login, logout } from '../controllers/authController.ts';

const router = Router()
  .post('/register', validateRegistration, asyncWrapper(register))
  .post('/login', validateLogin, asyncWrapper(login))
  .get('/logout', logout);

export default router;