import { AuthUser } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthUser } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { authUsers } from '../constants/auth-users.constant';

@Injectable()
export class AuthUsersSeederService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>
  ) {}

  create(): Array<Promise<AuthUser>> {
    return authUsers.map(async (user: IAuthUser) => {
      try {
        return await this.userRepository.save(user);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
