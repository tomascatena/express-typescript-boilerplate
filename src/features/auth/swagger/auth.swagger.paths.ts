import { getMe } from './getMe.swagger';
import { login } from './login.swagger';

export default {
  ...getMe,
  ...login,
};
