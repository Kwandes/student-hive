import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CreateUserRequest,
  IUser,
  updateUserRequest,
} from '@student-hive/interfaces';
import { User } from '../models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOkResponse({ type: [User] })
  async getAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  get(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @Post('')
  @ApiOkResponse({ type: User })
  create(@Body() createRequest: CreateUserRequest): Promise<IUser> {
    return this.usersService.create(createRequest);
  }

  @Put(':id')
  @ApiOkResponse({ type: User })
  update(
    @Param('id') id: string,
    @Body() updateRequest: updateUserRequest
  ): Promise<IUser> {
    return this.usersService.update(updateRequest, id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.perish(id);
  }
}
