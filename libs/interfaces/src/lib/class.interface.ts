import { IBase } from './interfaces';

export interface IClass extends IBase {
  classId: string;
  name: string;
}

export interface ICreateClassRequest {
  name: string;
}
