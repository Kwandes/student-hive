import { User } from '@models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserRequest,
  IJwtInfo,
  IUser,
  Role,
  updateUserRequest,
} from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all users. Role: Teacher, Admin' })
  @ApiOkResponse({ type: [User] })
  async getAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get authenticated users info' })
  @ApiOkResponse({ type: User })
  getMe(@AuthUser() authUser: IJwtInfo): Promise<IUser> {
    return this.usersService.findOne(authUser.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a user by id. Role: Teacher, Admin' })
  @ApiOkResponse({ type: User })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Obsolete endpoint, used to create user data to connect with an auth user. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: User })
  create(@Body() createRequest: CreateUserRequest): Promise<IUser> {
    return this.usersService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiOperation({ summary: 'Update currently authenticated user data' })
  @ApiOkResponse({ type: User })
  updateMe(
    @AuthUser() authUser: IJwtInfo,
    @Body() updateRequest: updateUserRequest
  ): Promise<IUser> {
    return this.usersService.update(updateRequest, authUser.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update user by id. Role: Teacher, Admin' })
  @ApiOkResponse({ type: User })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequest: updateUserRequest
  ): Promise<IUser> {
    return this.usersService.update(updateRequest, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary:
      'Delete a specific user information. Does not remove auth user info. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.perish(id);
  }
}
