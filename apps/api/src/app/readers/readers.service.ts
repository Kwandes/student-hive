import { Classroom, Reader } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReader, ICreateReaderRequest } from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readonly readersRepo: Repository<Reader>,
    @InjectRepository(Classroom)
    private readonly classroomRepo: Repository<Classroom>
  ) {}

  /**
   * Find all reader entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<Reader[]> {
    return this.readersRepo.find({ relations: ['classroom'] });
  }

  /**
   * Find a singular reader by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Reader> {
    return this.readersRepo.findOneOrFail({
      where: { readerId: id },
      relations: ['classroom']
    });
  }

  async update(id: string, request: ICreateReaderRequest) {
    const reader = await this.readersRepo.findOneOrFail({
      where: { readerId: id },
    });
    reader.mac = request.mac;
    reader.status = request.status;
    reader.isEnabled = request.isEnabled;
    const classroom = await this.classroomRepo.findOneOrFail({
        where: { classroomId: request.classroomId }
    });
    reader.classroom = classroom;

    return this.readersRepo.save(reader);
  }

  /**
   * Create and persist a reader entity.
   * @param request information for reader creation.
   * @returns created reader.
   */
  async create(request: ICreateReaderRequest): Promise<IReader> {
    const { mac, status, isEnabled, classroomId } = request;
    const classroom = await this.classroomRepo.findOneOrFail({
        where: { classroomId: classroomId }
    });
    const newReader = this.readersRepo.create({
      mac: mac,
      status: status,
      isEnabled: isEnabled,
      classroom: classroom
    });

    return this.readersRepo.save(newReader);
  }


  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.readersRepo.delete({
      readerId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Reader, id);
    }
  }
}
