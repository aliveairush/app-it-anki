import { Router } from 'express';
import { getUserController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth-middleware';

export const usersRouter = Router();

usersRouter.get('/users', authMiddleware, getUserController);
