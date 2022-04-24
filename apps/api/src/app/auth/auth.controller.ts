import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
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
  IMessage,
  LoginRequest,
  LoginResponse,
  Role,
  SignupRequest,
} from '@student-hive/interfaces';
import { AuthUsersService } from '../auth-users/auth-users.service';
import { EnumValidationPipe } from '../shared/pipes/enum-validation.pipe';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';

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
  @Roles(Role.teacher)
  @Get('teacher')
  getTeacherData(): IMessage {
    return { message: 'Teacher data' };
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
    summary: `Create a user. Pass role query var with either 'student' or 'teacher' value.`,
  })
  @ApiOkResponse({ type: LoginResponse })
  async signup(
    @Body() signupRequestDto: SignupRequest,
    @Query(
      'role',
      new EnumValidationPipe(Role),
      new DefaultValuePipe(Role.student)
    )
    role: Role
  ) {
    return this.authService.signup(signupRequestDto, role);
  }

  /*
    TODO - only allows teachers or account owners to perform this action.
    Can be done by reading auth info and, if student, comparing it against the auth user ID.
    Potentially split into two endpoints, Delete /users/:id used by teachers, and Delete /users/me to delete auth users account.
  */
  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a given account and all of their information (Teacher). If called by student, will delete their account if the id matches (WiP).',
  })
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.authUsersService.perish(id);
  }
}
