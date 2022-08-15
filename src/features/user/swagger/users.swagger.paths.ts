import { getAllUsers } from './getAllUsers.swagger';
import { getUserById } from './getUserById.swagger';
import { register } from './register.swagger';

export default {
  '/users': {
    ...register,
    ...getAllUsers,
  },
  '/users/:userId': {
    ...getUserById,
  },
};
