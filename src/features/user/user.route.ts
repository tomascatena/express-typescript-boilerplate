import { check, param, query } from 'express-validator';
import { isRoleValid } from './helpers/isRoleValid';
import { validationsResults } from '@/middleware/validationsResults';
import express from 'express';
import userController from './user.controller';

const router = express.Router();

/**
 * @route    GET api/v1/users
 * @desc     Get all users paginated and filtered
 * @access   Public
 */
router.get(
  '/',
  [
    query('limit')
      .optional()
      .isInt({ min: 0 }),
    query('from')
      .optional()
      .isInt({ min: 0 }),
    validationsResults(),
  ],
  userController.getAllUsers,
);

/**
 * @route    GET api/v1/users/:userId
 * @desc     Get a user by id
 * @access   Public
 */
router.post(
  '/',
  [
    check('username', 'Username is required')
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage('Username must be between 2 and 30 characters'),
    check('email', 'Email is required')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('Email is invalid'),
    check('password', 'Password is required')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('role')
      .optional({ checkFalsy: true, nullable: true })
      .custom(isRoleValid),
    validationsResults(),
  ],
  userController.register,
);

/**
 * @route   PUT api/v1/users/:userId
 * @desc    Update a user
 * @access  Private
 */
router.put(
  '/:userId',
  [
    param('userId', 'User ID is required')
      .isMongoId()
      .withMessage('User ID is invalid'),
    check('username')
      .optional({ checkFalsy: true, nullable: true })
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage('Username must be between 2 and 30 characters'),
    check('email')
      .optional({ checkFalsy: true, nullable: true })
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('Email is invalid'),
    check('password', 'Password is required')
      .optional({ checkFalsy: true, nullable: true })
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('profileImage')
      .optional({ checkFalsy: true, nullable: true })
      .trim()
      .notEmpty()
      .isString()
      .isLength({ max: 2048 })
      .withMessage('Profile image is invalid'),
    check('role')
      .optional({ checkFalsy: true, nullable: true })
      .custom(isRoleValid),
    validationsResults(),
  ],
  userController.update,
);

/**
 * @route   DELETE api/v1/users/:userId
 * @desc    Delete a user
 * @access  Private
 */
router.delete(
  '/',
  [
    param('userId', 'User ID is required')
      .isMongoId()
      .withMessage('User ID is invalid'),
    validationsResults(),
  ],
  userController.remove,
);

export default router;
