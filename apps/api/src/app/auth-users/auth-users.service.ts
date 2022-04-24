import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthUser, ISignupRequest, Role } from '@student-hive/interfaces';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { AuthUser } from '../models/auth-user.entity';
import { User } from '../models/user.entity';

@Injectable()
export class AuthUsersService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepo: Repository<AuthUser>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private connection: Connection
  ) {}

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOne(email: string): Promise<AuthUser | undefined> {
    const authUser = await this.authUserRepo.findOne({
      where: { email: email },
      relations: ['user'],
    });

    // remove the eagerly-loaded authUser object from the nested user object
    if (authUser?.user) {
      delete authUser.user.authUser;
    }
    return authUser;
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
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let newAuthUser = await queryRunner.manager.create(AuthUser, {
        email: email,
        password: password,
        role: role,
      });
      newAuthUser = await queryRunner.manager.save(newAuthUser);
      const newUser = await queryRunner.manager.create(User, {
        authUser: newAuthUser,
        authUserId: newAuthUser.authUserId,
      });
      await queryRunner.manager.save(newUser);

      await queryRunner.commitTransaction();
      newAuthUser.user = newUser;
      return newAuthUser;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      Logger.warn(err);
      // console.warn(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.authUserRepo.delete({
      authUserId: id,
    });
    // delete the child entity explicitly since the cascade options in the relationship don't seem to work
    this.usersRepo.delete({
      authUserId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(AuthUser, id);
    }
  }
}
