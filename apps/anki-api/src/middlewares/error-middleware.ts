import { ApiError } from '../exceptions/api-error';
import express from 'express';

export function errorMiddleware(
  err,
  req: express.Request,
  res: express.Response,
  next
) {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Something went wrong' });
}
