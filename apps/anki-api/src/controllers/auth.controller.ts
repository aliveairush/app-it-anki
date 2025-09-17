import type { Request, Response } from 'express';
import { registerUser } from '../services/auth-service';

export const registerUserController = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const { email, password } = req.body;
    const respData = await registerUser({ email, password });
    res.cookie('refreshToken', respData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
      httpOnly: true
    });
    res.json(respData);
  } catch (err) {
    next(err);
  }
};
