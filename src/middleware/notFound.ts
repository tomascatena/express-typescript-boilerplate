import { NotFoundException } from '@/utils/CustomExceptions';
import { Request } from 'express';

/**
 * @middleware
 * @description - Not found middleware. It will return a 404 status code and send a message.
 * @param req - The request object
 */
export const notFound = (req: Request) => {
  throw new NotFoundException(`${req.method} ${req.path} not found`);
};
