import { IAuthUser } from './auth-user.interface';
import { IBase } from './interfaces';

export interface IUser extends IBase {
  userId: string;
  name?: string;
  lastname?: string;
  birthdate?: Date;
  authUser: IAuthUser;
  authUserId: string;
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
}
