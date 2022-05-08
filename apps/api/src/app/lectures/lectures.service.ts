import { Lecture } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IClassroom,
  ICreateClassroomRequest,
  ICreateLectureRequest,
} from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lecturesRepo: Repository<Lecture>
  ) {}

  /**
   * Find all lecture entities by class id.
   * @returns Array of entities.
   * 
   * TO DO, class not implemented yet
   * 
   *async findByClassId(): Promise<Lecture[]> {
     return this.lecturesRepo.find();
    }
   */

  /**
   * Find a singular lecture by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Lecture> {
    return this.lecturesRepo.findOneOrFail({
      where: { lectureId: id },
    });
  }

  /**
   * Update a Lecture by their id
   * @param id id of the entity
   * @param request information for lecture creation.
   * @returns entity or EntityNotFounderror
   */
  async update(id: string, request: ICreateLectureRequest): Promise<Lecture> {
    const lecture = await this.lecturesRepo.findOneOrFail({
      where: { lectureId: id },
    });
    lecture.start = request.start;
    lecture.end = request.end;
    return this.lecturesRepo.save(lecture);
  }

  /**
   * Create and persist a lecture entity.
   * @param request information for lecture creation.
   * @returns created lecture.
   */
  async create(request: ICreateLectureRequest) {
    const { start, end } = request;
    const newLecture = this.lecturesRepo.create({
      start: start,
      end: end,
    });
    return this.lecturesRepo.save(newLecture);
  }

  /**
   * Delete a lecture entity by its id.
   * @param id id of the lecture.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.lecturesRepo.delete({
      lectureId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Lecture, id);
    }
  }

  /**
   * TO DO: Delete all lectures by class id
   */
}
