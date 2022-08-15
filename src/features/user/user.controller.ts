import { ApiError } from '@/utils/ApiError/ApiError';
import { RequestWithBody } from '@/typings/typings';
import { Response } from 'express';
import { UserRole } from '@/config/roles';
import { catchAsync } from '@/utils/catchAsync/catchAsync';
import User from './User.model';
import httpStatus from 'http-status-codes';
import tokenService from '@/services/tokens.service';

/**
 * @route    GET api/v1/users
 * @desc     Get all users paginated and filtered
 * @access   Public
 */
const getAllUsers = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const {
      limit = 5,
      from = 0,
    } = req.query;

    const usersQuery = { isActive: true };

    const [users, totalActiveUsers] = await Promise.all([
      User.find(usersQuery).limit(Number(limit)).skip(Number(from)), //
      User.countDocuments(usersQuery),
    ]);

    if (!users) {
      return res.status(404).json({
        message: 'No users found',
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Users retrieved successfully',
      totalUsers: totalActiveUsers,
      users: users.map((user) => user.toJSON()),
    });
  },
);

/**
 * @route    GET api/v1/users/:userId
 * @desc     Get a user by id
 * @access   Public
 */
const getUser = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'User retrieved successfully',
      user: user.toJSON(),
    });
  },
);

/**
 * @route    POST api/v1/users
 * @desc     Register a user
 * @access   Public
 */
const register = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { username, email, password } = req.body;

    if (await User.isEmailTaken(email!)) {
      res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: 'Email is already taken',
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: UserRole.USER,
    });

    const token = tokenService.generateToken(user._id);

    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: 'User created successfully',
      user,
      token,
    });
  },
);

/**
 * @route    PUT api/v1/users/:userId
 * @desc     Update a user
 * @access   Private
 */
const update = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    console.log('update');
    const { userId } = req.params;

    const {
      password,
      username,
      email,
      profileImage,
    } = req.body;

    if (!password && !username && !email && !profileImage) {
      res.status(httpStatus.NO_CONTENT).json({
        status: httpStatus.NO_CONTENT,
        message: 'No fields to update',
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...(password && { password }),
        ...(username && { username }),
        ...(email && { email }),
        ...(profileImage && { profileImage }),
      },
      { new: true },
    );

    if (!user) {
      return new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        isOperational: false,
      });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: user.toJSON(),
    });
  },
);

/**
 * @route    DELETE api/v1/users/:userId
 * @desc     Delete a user
 * @access   Private
 */
const remove = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        isOperational: false,
      });
    }

    res.status(httpStatus.NO_CONTENT).json({
      status: httpStatus.NO_CONTENT,
      message: 'User deleted successfully',
    });
  },
);

export default {
  getAllUsers,
  getUser,
  register,
  update,
  remove,
};
