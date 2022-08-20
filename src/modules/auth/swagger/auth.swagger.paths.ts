import { getMe } from './getMe.swagger';
import { login } from './login.swagger';

export default {
  '/auth/login': {
    ...login,
  },
  '/auth/me': {
    ...getMe,
  },
};
