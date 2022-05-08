import { IClass } from './class.interface';
import { IBase } from './interfaces';

export interface ILecture extends IBase {
  lectureId: string;
  start: Date;
  end: Date;
  class: IClass;
  //readerId: string;
}

export interface ICreateLectureRequest {
  start: Date;
  end: Date;
  classId: string;
}
