import { NextFunction, Response } from 'express';
import { RequestWithBody } from '@/interfaces/interfaces';
import { UnauthorizedException } from '@/utils/CustomExceptions';
import { env } from '@/config/env';
import { header } from 'express-validator';
import { validationsResults } from './validationsResults';
import User from '@/modules/user/User.model';
import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';

type JWTPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export const requireJWTAuth = [
  header('authorization', 'Not authorized to access this endpoint')
    .custom((value) => {
      const jwt = value.split(' ')[1];

      return Boolean(jwt && validator.isJWT(jwt));
    })
    .withMessage('Not authorized to access this endpoint'),
  validationsResults(),
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(' ')[1];

    try {
      const decoded = jsonwebtoken.verify(token, env.JWT_SECRET);

      const authenticatedUserId = (decoded as JWTPayload).userId;

      const authenticatedUser = await User.findById(authenticatedUserId);

      if (!authenticatedUser) {
        throw new UnauthorizedException('Not authorized to access this endpoint');
      }

      req.authenticatedUserId = authenticatedUserId;
      req.authenticatedUser = authenticatedUser;
    } catch (error) {
      next(error);
    }

    next();
  },
];
