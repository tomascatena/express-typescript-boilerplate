import { check, param, query } from 'express-validator';
import { isRoleValid } from './helpers/isRoleValid';
import { validationsResults } from '@/middleware/validationsResults';

const getAllUsers = [
  query('limit')
    .optional()
    .isInt({ min: 0 }),
  query('from')
    .optional()
    .isInt({ min: 0 }),
  validationsResults(),
];

const register = [
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
];

const update = [
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
];

const remove = [
  param('userId', 'User ID is required')
    .isMongoId()
    .withMessage('User ID is invalid'),
  validationsResults(),
];

export default {
  getAllUsers,
  register,
  update,
  remove,
};
