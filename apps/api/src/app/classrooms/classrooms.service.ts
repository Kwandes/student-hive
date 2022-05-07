import { Classroom } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IClassroom,
  ICreateClassroomRequest
} from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomsRepo: Repository<Classroom>,
  ) {}

  /**
   * Find all classroom entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<Classroom[]> {
    return this.classroomsRepo.find();
  }

  /**
   * Find a singular classroom by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Classroom> {
    return this.classroomsRepo.findOneOrFail({
      where: { classroomId: id },
    });
  }

  async update(id:string, request:ICreateClassroomRequest){
    const classroom = await this.classroomsRepo.findOneOrFail({ where: { classroomId: id } });
    classroom.name = request.name;

    return this.classroomsRepo.save(classroom);
  }

 
  /**
   * Create and persist a classroom entity.
   * @param request information for classroom creation.
   * @returns created classroom.
   */
  async create(request: ICreateClassroomRequest): Promise<IClassroom> {

    const {name} = request;
    const newClassroom = this.classroomsRepo.create({
      name: name,
    });

    return this.classroomsRepo.save(newClassroom);
  }

  // No update endpoint - Classroom are either fetched, created or deleted.

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.classroomsRepo.delete({
      classroomId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Classroom, id);
    }
  }
}
