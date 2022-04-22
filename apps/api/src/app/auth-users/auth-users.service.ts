import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthUser, ISignupRequest, Role } from '@student-hive/interfaces';
import { Repository } from 'typeorm';
import { AuthUser } from '../models/auth-user.entity';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepo: Repository<AuthUser>
  ) {}

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOne(email: string): Promise<AuthUser | undefined> {
    return this.authUserRepo.findOne({ where: { email: email } });
  }

  /**
   * Create and persist a user entity.
   * @param signupRequestDto information for user creation.
   * @returns created user.
   */
  async create(
    signupRequestDto: ISignupRequest,
    role: Role
  ): Promise<IAuthUser> {
    const { email, password } = signupRequestDto;
    const newUser = this.authUserRepo.create({
      email: email,
      password: password,
      role: role,
    });
    return this.authUserRepo.save(newUser);
  }
}
