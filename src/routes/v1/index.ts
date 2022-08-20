import authRoutes from '@/modules/auth/auth.route';
import docsRoutes from '@/modules/docs/docs.route';
import express from 'express';
import userRoutes from '@/modules/user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/docs', docsRoutes);

export default router;
