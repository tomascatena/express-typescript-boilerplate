export const UserRole = {
  USER: 'USER_ROLE',
  ADMIN: 'ADMIN_ROLE',
} as const;

type Keys = keyof typeof UserRole;

export type Roles = typeof UserRole[Keys];
