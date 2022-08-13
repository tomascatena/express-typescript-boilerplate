import authRoutes from '@/features/auth/auth.route';
import docsRoutes from '@/features/docs/docs.route';
import express from 'express';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/docs', docsRoutes);

export default router;
