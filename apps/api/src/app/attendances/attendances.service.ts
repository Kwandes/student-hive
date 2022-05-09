import { Attendance, AuthUser, Lecture } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetAttendanceQuery,
  IAttendance,
  ICreateAttendanceRequest,
} from '@student-hive/interfaces';
import { endOfDay, startOfDay } from 'date-fns';
import { Between, EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendancesRepo: Repository<Attendance>,
    @InjectRepository(AuthUser)
    private readonly authUserRepo: Repository<AuthUser>,
    @InjectRepository(Lecture)
    private readonly lecturesRepo: Repository<Lecture>
  ) {}

  /**
   * Find a singular attendance by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Attendance> {
    return this.attendancesRepo.findOneOrFail({
      where: { attendanceId: id },
      relations: ['authUser', 'lecture'],
    });
  }

  /**
   * Find all attendances associated with a given auth user.
   * @param id id of the auth user.
   * @returns entity list or EntityNotFound error.
   */
  async findAllOfAuthUser(
    id: string,
    query: GetAttendanceQuery
  ): Promise<Attendance[]> {
    const { date, classId } = query;
    // days "start" at 22:00 of the previous day, and end on 21:59 of the given day
    const findOptions = {
      createdAt: Between(
        startOfDay(new Date(date ? date : new Date())).toISOString(),
        endOfDay(new Date(date ? date : new Date())).toISOString()
      ),
      // TODO - enable filtering by class. Requires class entity to be implemented
      // class: {
      //   classId: undefined,
      // },
      authUser: {
        authUserId: id,
      },
    };

    if (!date) {
      delete findOptions.createdAt;
    }

    return this.attendancesRepo.find({
      where: findOptions,
      relations: ['authUser', 'lecture', 'lecture.class'],
    });
  }

  /**
   * Find all attendances.
   * @returns a list of attendances.
   */
  async findAll(query: GetAttendanceQuery): Promise<IAttendance[]> {
    const { date, classId } = query;
    // days "start" at 22:00 of the previous day, and end on 21:59 of the given day
    const findOptions = {
      createdAt: Between(
        startOfDay(new Date(date ? date : new Date())).toISOString(),
        endOfDay(new Date(date ? date : new Date())).toISOString()
      ),
      // TODO - enable filtering by class. Requires class entity to be implemented
      // class: {
      //   classId: undefined,
      // },
    };

    if (!date) {
      delete findOptions.createdAt;
    }
    return this.attendancesRepo.find({
      relations: ['authUser', 'lecture', 'lecture.class'],
      where: findOptions,
    });
  }

  /**
   * Create and persist a attendance entity.
   * @param request information for attendance creation.
   * @returns created attendance.
   */
  async create(request: ICreateAttendanceRequest): Promise<IAttendance> {
    const { authUserId, lectureId } = request;
    // validate that the auth user exists
    const authUser = await this.authUserRepo.findOneOrFail({
      where: { authUserId: authUserId },
    });

    // validate that the lecture exists
    const lecture = await this.lecturesRepo.findOneOrFail({
      where: { lectureId: lectureId },
    });

    const newAttendance = this.attendancesRepo.create({
      authUser: authUser,
      lecture: lecture,
    });

    return this.attendancesRepo.save(newAttendance);
  }

  // No update endpoint - attendances are either fetched, created or deleted.

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.attendancesRepo.delete({
      attendanceId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Attendance, id);
    }
  }
}
