import { IAuthUser } from './auth-user.interface';
import { IClass } from './class.interface';
import { IBase } from './interfaces';

export interface IUser extends IBase {
  userId: string;
  name?: string;
  lastname?: string;
  birthdate?: Date;
  authUser: IAuthUser;
  authUserId: string;
  classes: IClass[];
}

export interface ICreateUserRequest {
  name?: string;
  lastName?: string;
  birthdate?: Date;
  authUserId: string;
}

export interface IUpdateUserRequest {
  name?: string;
  lastName?: string;
  birthdate?: Date;
  classes?: string[];
}
