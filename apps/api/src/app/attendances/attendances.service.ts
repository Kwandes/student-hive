import { Attendance, AuthUser } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IAttendance,
  ICreateAttendanceRequest,
} from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendancesRepo: Repository<Attendance>,
    @InjectRepository(AuthUser)
    private readonly authUserRepo: Repository<AuthUser>
  ) {}

  /**
   * Find a singular attendance by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Attendance> {
    return this.attendancesRepo.findOneOrFail({
      where: { attendanceId: id },
      relations: ['authUser'],
    });
  }

  /**
   * Find all attendances associated with a given auth user.
   * @param id id of the auth user.
   * @returns entity list or EntityNotFound error.
   */
  async findAllOfAuthUser(id: string): Promise<Attendance[]> {
    return this.attendancesRepo.find({
      where: {
        authUser: {
          authUserId: id,
        },
      },
      relations: ['authUser'],
    });
  }

  /**
   * Find all attendances.
   * @returns a list of attendances.
   */
  async findAll(): Promise<IAttendance[]> {
    return this.attendancesRepo.find({ relations: ['authUser'] });
  }

  /**
   * Create and persist a attendance entity.
   * @param request information for attendance creation.
   * @returns created attendance.
   */
  async create(request: ICreateAttendanceRequest): Promise<IAttendance> {
    const { authUserId } = request;
    // validate that the auth user exists
    const authUser = await this.authUserRepo.findOneOrFail({
      where: { authUserId: authUserId },
    });

    const newAttendance = this.attendancesRepo.create({
      authUser: authUser,
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
