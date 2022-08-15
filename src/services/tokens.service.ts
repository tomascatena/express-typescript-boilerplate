import { env } from '@/config/env';
import jwt from 'jsonwebtoken';

const generateToken = (userId: string) => jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });

export default {
  generateToken,
};
