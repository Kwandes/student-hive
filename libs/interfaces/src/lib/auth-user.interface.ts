import { Role } from './role.enum';

export interface IAuthUser {
  authUserId: string;
  email: string;
  password: string;
  role: Role;
}
