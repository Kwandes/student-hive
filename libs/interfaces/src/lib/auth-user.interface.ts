import { IBase } from './interfaces';
import { Role } from './role.enum';
import { IUser } from './user.interface';

export interface IAuthUser extends IBase {
  authUserId: string;
  email: string;
  password: string;
  role: Role;
  user?: IUser;
}
