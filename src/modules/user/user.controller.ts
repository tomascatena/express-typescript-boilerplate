import {
  AcceptedException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@/utils/CustomExceptions';
import { RequestWithBody } from '@/interfaces/interfaces';
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
      User.find(usersQuery).limit(Number(limit)).skip(Number(from)),
      User.countDocuments(usersQuery),
    ]);

    if (!users) {
      throw new NotFoundException('No users found');
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
      throw new NotFoundException(`User with id ${req.params.userId} not found`);
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
      throw new ConflictException('Email is already taken');
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
    const { userId } = req.params;
    const authenticatedUser = req.authenticatedUser!;

    console.log(authenticatedUser);
    console.log(userId);

    if (
      userId !== authenticatedUser._id?.toString()
      && authenticatedUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    const {
      password,
      username,
      email,
      profileImage,
    } = req.body;

    if (!password && !username && !email && !profileImage) {
      throw new AcceptedException('No changes were made');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(password && { password }),
        ...(username && { username }),
        ...(email && { email }),
        ...(profileImage && { profileImage }),
      },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser.toJSON(),
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
    const authenticatedUser = req.authenticatedUser!;

    if (
      userId !== authenticatedUser._id?.toString()
      && authenticatedUser.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }

    const removedUser = await User.findByIdAndDelete(userId);

    if (!removedUser) {
      throw new NotFoundException('User not found');
    }

    res.status(httpStatus.ACCEPTED).json({
      status: httpStatus.ACCEPTED,
      message: 'User deleted successfully',
      removedUser: removedUser.toJSON(),
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
