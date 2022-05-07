import { Classroom } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IClassroom } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { classrooms } from '../constants/classrooms.constants';
@Injectable()
export class ClassroomSeederService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepo: Repository<Classroom>
  ) {}

  create(): Array<Promise<Classroom>> {
    return classrooms.map(async (classroom: IClassroom) => {
      try {
        return await this.classroomRepo.save(classroom);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
