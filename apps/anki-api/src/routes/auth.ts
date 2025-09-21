import { Router, Request, Response, NextFunction } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.controller';
export const authRouter = Router();
import { body } from 'express-validator';

authRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  registerUserController
);
authRouter.post('/login', loginUserController);

authRouter.post('/me', async (req, res, next) => {
  try {
    res.json({ message: 'Curerent user info' });
  } catch (err) {
    next(err);
  }
});
