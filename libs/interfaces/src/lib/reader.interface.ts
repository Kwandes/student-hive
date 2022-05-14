import { IClassroom } from './classroom.interface';
import { IBase } from './interfaces';
import { ReaderStatus } from './reader-status.enum';

export interface IReader extends IBase {
  readerId: string;
  mac: string;
  status: ReaderStatus;
  isEnabled: boolean;
  classroom: IClassroom;
}

export interface ICreateReaderRequest {
    mac: string;
    status: ReaderStatus;
    isEnabled: boolean;
    classroomId: string;
}
