import { IBase } from './interfaces';

export interface ILecture extends IBase {
  lectureId: string;
  start: Date;
  end: Date;
  //classId: string;
  //readerId: string;
}
