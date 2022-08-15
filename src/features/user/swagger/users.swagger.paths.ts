import { deleteUser } from './deleteUser.swagger';
import { getAllUsers } from './getAllUsers.swagger';
import { getUserById } from './getUserById.swagger';
import { register } from './register.swagger';

export default {
  '/users': {
    ...register,
    ...getAllUsers,
    ...deleteUser,
  },
  '/users/:userId': {
    ...getUserById,
  },
};
