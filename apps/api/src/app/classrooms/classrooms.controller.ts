import { Classroom } from '@models';
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
  CreateClassroomRequest,
  IClassroom,
  Role,
} from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ClassroomsService } from './classrooms.service';

@ApiTags('Classrooms')
@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('')
  @ApiOperation({
    summary: 'Get a list of all classrooms. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: [Classroom] })
  async getAll(): Promise<IClassroom[]> {
    return this.classroomsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a classroom by id. Role: Teacher, Admin' })
  @ApiOkResponse({ type: Classroom })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IClassroom> {
    return this.classroomsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary: 'Create an classroom. Role: Any',
  })
  @ApiOkResponse({ type: Classroom })
  create(@Body() createRequest: CreateClassroomRequest): Promise<IClassroom> {
    return this.classroomsService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Put(':id')
  @ApiOperation({
    summary: 'Update an classroom. Role: Admin, teacher',
  })
  @ApiOkResponse({ type: Classroom })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRequest: CreateClassroomRequest
  ): Promise<IClassroom> {
    return this.classroomsService.update(id, createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific classroom information. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.classroomsService.perish(id);
  }
}
