import { Class } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IClass, ICreateClassRequest } from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepo: Repository<Class>
  ) {}

  /**
   * Find a singular class by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Class> {
    return this.classesRepo.findOneOrFail({
      where: { classId: id },
      relations: ['lectures'],
    });
  }

  /**
   * Find all classes.
   * @returns a list of classes.
   */
  async findAll(): Promise<IClass[]> {
    return this.classesRepo.find();
  }

  /**
   * Create and persist a class entity.
   * @param request information for class creation.
   * @returns created class.
   */
  async create(request: ICreateClassRequest): Promise<IClass> {
    const { name } = request;

    const newClass = this.classesRepo.create({
      name: name,
    });

    return this.classesRepo.save(newClass);
  }

  // No update endpoint - classes are either fetched, created or deleted.

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.classesRepo.delete({
      classId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Class, id);
    }
  }
}
