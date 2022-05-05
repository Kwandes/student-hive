import { Attendance } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAttendance } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { attendances } from '../constants/attendances.constant';

@Injectable()
export class AttendancesSeederService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>
  ) {}

  create(): Array<Promise<Attendance>> {
    return attendances.map(async (attendance: IAttendance) => {
      try {
        return await this.attendanceRepo.save(attendance);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
