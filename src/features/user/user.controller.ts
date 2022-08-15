import { RequestWithBody } from '@/typings/typings';
import { Response } from 'express';
import { catchAsync } from '@/utils/catchAsync/catchAsync';
import httpStatus from 'http-status-codes';

/**
 * @route    POST api/v1/users/register
 * @desc     Register a user
 * @access   Public
 */
const register = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    res.status(httpStatus.OK).json({ message: 'Successfully logged in' });
  },
);

export default {
  register,
};
