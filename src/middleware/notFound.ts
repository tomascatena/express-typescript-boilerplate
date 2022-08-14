import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

/**
 * @middleware
 * @description - Not found middleware. It will return a 404 status code and send a message.
 * @param req - The request object
 * @param res - The response object
 */
export const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send(`Not found - ${req.originalUrl}`);
};
