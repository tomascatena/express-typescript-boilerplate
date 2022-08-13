import { RequestWithBody } from '@/typings/typings';
import { Response } from 'express';
import { catchAsync } from '@/utils/catchAsync/catchAsync';
import httpStatus from 'http-status-codes';

/**
 * @route    POST api/v1/auth/login
 * @desc     Authenticate user & get token
 * @access   Private
 */
const loginUser = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    res.status(httpStatus.OK).json({ message: 'Successfully logged in' });
  },
);

/**
 * @route    GET api/v1/auth
 * @desc     Get auth user
 * @access   Private
 */
const getUser = catchAsync(
  async (req: RequestWithBody, res: Response) => res.status(httpStatus.OK).json({
    message: 'Successfully authenticated user',
  }),
);

export default {
  loginUser,
  getUser,
};
