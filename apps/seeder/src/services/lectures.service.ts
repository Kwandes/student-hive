import { Lecture } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILecture } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { lectures } from '../constants/lectures.constants';
@Injectable()
export class LecturesSeederService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepo: Repository<Lecture>
  ) {}

  create(): Array<Promise<Lecture>> {
    return lectures.map(async (lectures: ILecture) => {
      try {
        return await this.lectureRepo.save(lectures);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
