import { ApiError } from '@/utils/ApiError/ApiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import mongoose from 'mongoose';

/**
 * @middleware
 * @description - Transforms the error into an instance of ApiError (if is not already) and pass it to the next middleware.
 * @param err - The error thrown
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const transformErrorToAPIError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error
      ? error.statusCode
      : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    error = new ApiError({
      isOperational: false,
      message,
      stack: err.stack,
      statusCode,
    });
  }

  next(error);
};
