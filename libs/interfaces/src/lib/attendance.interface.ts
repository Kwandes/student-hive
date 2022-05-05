import { IAuthUser } from './auth-user.interface';
import { IBase } from './interfaces';

export interface IAttendance extends IBase {
  attendanceId: string;
  authUser: IAuthUser;
  // TODO - add lecture to attendance creation. Requires lecture entity to be implemented
  //lecture: ILecture
}

export interface ICreateAttendanceRequest {
  authUserId: string;
  // TODO - add lecture to attendance creation. Requires lecture entity to be implemented
  //lectureId: string
}
