import { Router } from 'express';
import { registerUserController } from '../controllers/auth.controller';
export const authRouter = Router();

authRouter.post('/register', registerUserController);

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
