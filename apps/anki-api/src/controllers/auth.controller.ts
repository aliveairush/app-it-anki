import type { NextFunction, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth-service';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error';

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return next(
        ApiError.BadRequest('Validation failed', validationError.array())
      );
    }
    const { email, password } = req.body;
    const respData = await registerUser({ email, password });
    res.cookie('refreshToken', respData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
      httpOnly: true,
    });
    res.json(respData);
  } catch (err) {
    next(err);
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
      httpOnly: true,
    });
    res.json(userData);
  }catch (error) {
    next(error);
  }
}
