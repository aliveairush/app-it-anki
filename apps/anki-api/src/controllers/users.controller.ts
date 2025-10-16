import type { NextFunction, Request, Response } from 'express';
import { getAllUsers } from '../services/users-service';

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await getAllUsers());
  } catch (error) {
    next(error);
  }
};
