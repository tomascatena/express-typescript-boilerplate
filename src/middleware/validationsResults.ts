import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status-codes';

/**
 * Will check if there are any validation errors, and if so, will return the errors in the response.
 * @param statusCode - The status code of the error. Default: 400 (Bad Request)
 * @param responseMessage - The message of the error. If not provided, the default message is used ('Invalid information')
 * @returns
 */
export const validationsResults = (
  statusCode = httpStatus.BAD_REQUEST,
  responseMessage = 'Invalid information',
) => (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(statusCode).json({
      message: responseMessage,
      errors: errors.mapped(),
    });
  }

  next();
};
