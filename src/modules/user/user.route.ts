import { requireJWTAuth } from '@/middleware/requireJWTAuth';
import express from 'express';
import userController from './user.controller';
import userValidations from './user.validations';

const router = express.Router();

/**
 * @route    GET api/v1/users
 * @desc     Get all users paginated and filtered
 * @access   Public
 */
router.get(
  '/',
  userValidations.getAllUsers,
  userController.getAllUsers,
);

/**
 * @route    GET api/v1/users/:userId
 * @desc     Get a user by id
 * @access   Public
 */
router.get(
  '/:userId',
  userValidations.getUserById,
  userController.getUser,
);

/**
 * @route    POST api/v1/users
 * @desc     Create a user
 * @access   Public
 */
router.post(
  '/',
  userValidations.register,
  userController.register,
);

/**
 * @route   PUT api/v1/users/:userId
 * @desc    Update a user
 * @access  Private
 */
router.put(
  '/:userId',
  requireJWTAuth,
  userValidations.update,
  userController.update,
);

/**
 * @route   DELETE api/v1/users/:userId
 * @desc    Delete a user
 * @access  Private
 */
router.delete(
  '/:userId',
  requireJWTAuth,
  userValidations.remove,
  userController.remove,
);

export default router;
