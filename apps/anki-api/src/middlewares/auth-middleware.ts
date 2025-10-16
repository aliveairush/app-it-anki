import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { verifyAccess } from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = verifyAccess(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError())

    }
    // @ts-ignore
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
