import { User } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { users } from '../constants/users.constant';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      try {
        return await this.userRepository.save(user);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
