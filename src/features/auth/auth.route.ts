import authController from './auth.controller';
import express from 'express';

const router = express.Router();

/**
 * @route   POST api/v1/auth
 * @desc    Login a user
 * @access  Public
 */
router.post(
  '/login',
  authController.loginUser,
);

/**
 * @route   GET api/v1/auth
 * @desc    Get auth user
 * @access  Private
 */
router.get(
  '/me',
  authController.getUser,
);

export default router;
