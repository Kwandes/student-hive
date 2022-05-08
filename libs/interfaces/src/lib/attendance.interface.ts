import { IAuthUser } from './auth-user.interface';
import { IBase } from './interfaces';
import { ILecture } from './lecture.interface';

export interface IAttendance extends IBase {
  attendanceId: string;
  authUser: IAuthUser;
  lecture: ILecture;
}

export interface ICreateAttendanceRequest {
  authUserId: string;
  lectureId: string;
}
