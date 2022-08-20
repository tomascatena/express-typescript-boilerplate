import { deleteUser } from './deleteUser.swagger';
import { getAllUsers } from './getAllUsers.swagger';
import { getUserById } from './getUserById.swagger';
import { register } from './register.swagger';
import { updateUser } from './updateUser.swagger';

export default {
  '/users': {
    ...register,
    ...getAllUsers,
    ...deleteUser,
  },
  '/users/:userId': {
    ...getUserById,
    ...updateUser,
  },
};
