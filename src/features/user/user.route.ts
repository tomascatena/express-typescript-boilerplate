import express from 'express';
import userController from './user.controller';

const router = express.Router();

/**
 * @route   POST api/v1/users/register
 * @desc    Login a user
 * @access  Public
 */
router.post(
  '/login',
  userController.register,
);

export default router;
