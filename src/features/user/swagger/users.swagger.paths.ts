import { getAllUsers } from './getAllUsers.swagger';
import { register } from './register.swagger';

export default {
  '/users': {
    ...register,
    ...getAllUsers,
  },
};
