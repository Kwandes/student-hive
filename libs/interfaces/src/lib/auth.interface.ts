import { Role } from './role.enum';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  role: Role;
}

export interface ISignupRequest {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  birthdate?: Date;
}

export interface ISignupResponse {
  accessToken: string;
  role: Role;
}
