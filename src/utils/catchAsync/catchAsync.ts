import { NextFunction, Request, Response } from 'express';

/**
 * Custom wrapper for express middleware to catch async errors
 * @param fn - The function to be executed
 */
export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
