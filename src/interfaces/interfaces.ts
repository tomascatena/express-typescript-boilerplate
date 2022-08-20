import { IUser } from '@/modules/user/User.model';
import { Request } from 'express';

export type Nullable<T> = T | null;

export interface RequestWithBody extends Request {
  body: { [key: string]: any };
  authenticatedUserId?: string;
  authenticatedUser?: Partial<IUser>;
}
