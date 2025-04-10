import { Router } from 'express';
import { asyncWrapper } from '../middleware/async.js';
import { login, register } from '../controllers/auth.js';

const router = Router()
  .post('/register', asyncWrapper(register))
  .post('/login', asyncWrapper(login));

export default router;