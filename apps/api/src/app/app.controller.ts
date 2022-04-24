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
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  IMessage,
  LoginRequest,
  LoginResponse,
  Role,
  SignupRequest,
} from '@student-hive/interfaces';
import { AppService } from './app.service';
import { AuthUsersService } from './auth-users/auth-users.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { EnumValidationPipe } from './shared/pipes/enum-validation.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private authUsersService: AuthUsersService
  ) {}

  @Get('hello')
  getData(): IMessage {
    return this.appService.getData();
  }

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
  @Post('auth/login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Request() req, @Body() LoginRequest: LoginRequest) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  // The role query variable could be path of the DTO but this way I get to showcase the custom enum validation pipe :)
  @Post('auth/signup')
  @ApiOperation({
    summary: `Create a user. Pass role query var with either 'student' or 'teacher' value`,
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

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.authUsersService.perish(id);
  }
}
