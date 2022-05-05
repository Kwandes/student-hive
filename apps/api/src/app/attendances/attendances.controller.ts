import { Attendance } from '@models';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAttendanceRequest,
  GetAttendanceQuery,
  IAttendance,
  IJwtInfo,
  Role,
} from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { AttendancesService } from './attendances.service';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('')
  @ApiOperation({
    summary: 'Get a list of all attendances. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: [Attendance] })
  async getAll(@Query() query: GetAttendanceQuery): Promise<IAttendance[]> {
    return this.attendancesService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get authenticated users attendances info' })
  @ApiOkResponse({ type: [Attendance] })
  getMe(
    @AuthUser() authUser: IJwtInfo,
    @Query() query: GetAttendanceQuery
  ): Promise<IAttendance[]> {
    return this.attendancesService.findAllOfAuthUser(
      authUser.authUserId,
      query
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a attendance by id. Role: Teacher, Admin' })
  @ApiOkResponse({ type: Attendance })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IAttendance> {
    return this.attendancesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary: 'Create an attendance. Role: Any',
  })
  @ApiOkResponse({ type: Attendance })
  create(@Body() createRequest: CreateAttendanceRequest): Promise<IAttendance> {
    return this.attendancesService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary:
      'Delete a specific attendance information. Does not remove auth attendance info. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.attendancesService.perish(id);
  }
}
