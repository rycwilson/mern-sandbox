import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { validator } from '../middleware/validation.ts';
import { registrationValidation, loginValidation } from '../models/user.ts';
import { register, login, logout } from '../controllers/authController.ts';

const router = Router()
  .post('/register', validator(registrationValidation), asyncWrapper(register))
  .post('/login', validator(loginValidation), asyncWrapper(login))
  .get('/logout', logout);

export default router;