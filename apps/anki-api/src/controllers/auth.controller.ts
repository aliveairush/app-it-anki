import type { NextFunction, Request, Response } from 'express';
import { registerUser } from '../services/auth-service';
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
        ApiError.BadRequestError('Validation failed', validationError.array())
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
