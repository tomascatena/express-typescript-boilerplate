import authController from './auth.controller';
import express from 'express';

const router = express.Router();

/**
 * @route   POST api/v1/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post(
  '/login',
  authController.login,
);

/**
 * @route   GET api/v1/auth/me
 * @desc    Get authenticated user
 * @access  Private
 */
router.get(
  '/me',
  authController.getUser,
);

export default router;
