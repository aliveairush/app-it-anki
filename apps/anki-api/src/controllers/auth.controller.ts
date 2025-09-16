import type { Request, Response } from 'express';
import { registerUser } from '../services/auth-service';

export const registerUserController = async (req: Request, res: Response, next) => {
  try {
    const {email, password} = req.body;
    const resp = await registerUser({email, password});
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
