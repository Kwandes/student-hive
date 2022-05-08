import { Class } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IClass } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { classes } from '../constants/classes.constant';

@Injectable()
export class ClassesSeederService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>
  ) {}

  create(): Array<Promise<Class>> {
    const classList = [
      classes.databases,
      classes.developmentOfLargeSystems,
      classes.developmentOfSmallSystems,
      classes.systemDesign,
      classes.systemIntegration,
      classes.technology,
      classes.testing,
    ];

    return classList.map(async (seedClass: IClass) => {
      try {
        return await this.classRepo.save(seedClass);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
