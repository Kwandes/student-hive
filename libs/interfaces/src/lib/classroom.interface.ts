import { IBase } from "./interfaces";

export interface IClassroom extends IBase {
    classroomId:string,
    name:string,
}

export interface ICreateClassroomRequest {
    name:string,
    // TODO - add lecture to attendance creation. Requires lecture entity to be implemented
    //lectureId: string
  }