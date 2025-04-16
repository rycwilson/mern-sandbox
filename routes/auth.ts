import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.ts';
import { login, register } from '../controllers/auth.ts';

const router = Router()
  .post('/register', asyncWrapper(register))
  .post('/login', asyncWrapper(login));

export default router;