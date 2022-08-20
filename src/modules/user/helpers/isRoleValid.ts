import { Roles, UserRole } from '@/config/roles';

export const isRoleValid = (role: Roles) => {
  if (!Object.values(UserRole).includes(role)) {
    throw new Error('Invalid role');
  }
};
