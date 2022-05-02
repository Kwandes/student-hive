import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  IJwtInfo,
  IMessage,
  LoginRequest,
  LoginResponse,
  Role,
  SignupRequest,
  SignupRequestQuery,
} from '@student-hive/interfaces';
import { AuthUsersService } from '../auth-users/auth-users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';
import { AuthUser } from './user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authUsersService: AuthUsersService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getConfidentialData(): IMessage {
    return { message: 'confidential data' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('student')
  @Roles(Role.student)
  getStudentData(): IMessage {
    return { message: 'Student data' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('teacher')
  getTeacherData(): IMessage {
    return { message: 'Teacher data' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('admin')
  getAdminData(): IMessage {
    return { message: 'Admin data' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Request() req, @Body() LoginRequest: LoginRequest) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  // The role query variable could be path of the DTO but this way I get to showcase the custom enum validation pipe :)
  @Post('signup')
  @ApiOperation({
    summary: `Create a user. Pass role query var with either 'student' or 'teacher' value'`,
  })
  @ApiOkResponse({ type: LoginResponse })
  async signup(
    @Body() signupRequestDto: SignupRequest,
    @Query()
    query: SignupRequestQuery
  ) {
    let { role } = query;
    if (role === undefined) {
      role = Role.student;
    }
    return this.authService.signup(signupRequestDto, role);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @ApiOperation({
    summary: 'Delete the account of the authenticated user',
  })
  @HttpCode(204)
  deleteMe(@AuthUser() authUser: IJwtInfo): Promise<void> {
    return this.authUsersService.perish(authUser.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a given account and all of their information. Role: Teacher, Admin',
  })
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.authUsersService.perish(id);
  }
}
