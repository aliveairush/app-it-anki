import { Router } from 'express';
import { registerUserController } from '../controllers/auth.controller';
export const authRouter = Router();
import { body } from 'express-validator';

authRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  registerUserController
);

authRouter.post('/login', async (req, res, next) => {
  try {
    res.json({ message: 'login Success' });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/me', async (req, res, next) => {
  try {
    res.json({ message: 'Curerent user info' });
  } catch (err) {
    next(err);
  }
});
