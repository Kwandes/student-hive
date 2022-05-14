import { Reader } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReader } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { readers } from '../constants/readers.constants';

@Injectable()
export class ReaderSeederService {
  constructor(
    @InjectRepository(Reader)
    private readonly readersRepo: Repository<Reader>
  ) {}

  create(): Array<Promise<Reader>> {
    return readers.map(async (reader: IReader) => {
      try {
        return await this.readersRepo.save(reader);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}