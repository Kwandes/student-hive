import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  IMessage,
  LoginRequest,
  LoginResponse,
  Role,
  SignupRequest,
} from '@student-hive/interfaces';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { EnumValidationPipe } from './shared/pipes/enum-validation.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get('hello')
  getData(): IMessage {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getConfidentialData(): IMessage {
    return { message: 'confidential data' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('student')
  @Roles(Role.student)
  getStudentData(): IMessage {
    return { message: 'Student data' };
  }

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
    summary: `Create a user. Pass role query var with either 'user' or 'admin' value`,
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
}
