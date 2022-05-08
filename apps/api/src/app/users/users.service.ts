  import { AuthUser, User } from '@models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IAuthUser,
  ICreateUserRequest,
  IUser,
  UpdateUserRequest,
} from '@student-hive/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(AuthUser)
    private readonly authUsersRepo: Repository<AuthUser>
  ) {}

  /**
   * Find a singular user by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<User> {
    return this.usersRepo.findOneOrFail({
      where: { userId: id },
      relations: ['authUser'],
    });
  }

  /**
   * Find all users.
   * @returns a list of users.
   */
  async findAll(): Promise<IUser[]> {
    return this.usersRepo.find({ relations: ['authUser'] });
  }

  /**
   * Create and persist a user entity.
   * @param request information for user creation.
   * @returns created user.
   */
  async create(request: ICreateUserRequest): Promise<IUser> {
    const { name, lastName, birthdate, authUserId } = request;
    // validate that the auth suer exists
    let authUser: IAuthUser;
    try {
      authUser = await this.authUsersRepo.findOneOrFail({
        where: { authUserId: authUserId },
      });
    } catch (EntityNotFound) {
      throw new BadRequestException(
        'No Auth user entity with matching id exists'
      );
    }

    // validate that the auth user is not assigned to not user already
    const existingUsers = await this.usersRepo.find({
      where: { authUserId: authUserId },
    });
    if (existingUsers.length != 0) {
      throw new BadRequestException(
        `AuthUserId: ${authUserId} is already taken by another user`
      );
    }

    const newUser = this.usersRepo.create({
      name: name,
      lastname: lastName,
      birthdate: birthdate,
      authUser: authUser,
      authUserId: authUserId,
    });

    return this.usersRepo.save(newUser);
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: UpdateUserRequest, id: string): Promise<IUser> {
    const { name, lastName, birthdate } = request;
    const user = await this.usersRepo.findOneOrFail({ where: { userId: id } });
    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastname = lastName;
    }
    if (birthdate) {
      user.birthdate = birthdate;
    }
    return this.usersRepo.save(user);
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.usersRepo.delete({
      userId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
