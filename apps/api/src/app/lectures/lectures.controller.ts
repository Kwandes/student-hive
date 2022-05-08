import { Lecture } from '@models';
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
import { CreateLectureRequest, ILecture, Role } from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { LecturesService } from './lectures.service';

@ApiTags('Lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}
  /*
  TO DO: Class not implemented yet
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles()
  @Get('/class/:id')
  @ApiOperation({
    summary: 'Get a list of all lectures for a class. Roles: Any',
  })
  @ApiOkResponse({ type: [Lecture] })
  async getByClass(): Promise<ILecture[]> {
    return null;
  }
  */

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles()
  @Get('')
  @ApiOperation({ summary: 'Get a list of all lectures. Role: Any' })
  @ApiOkResponse({ type: [Lecture] })
  async getAll(): Promise<ILecture[]> {
    return this.lecturesService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles()
  @Get(':id')
  @ApiOperation({
    summary: 'Get a lecture by id. Roles: Any',
  })
  @ApiOkResponse({ type: Lecture })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<ILecture> {
    return this.lecturesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary: 'Create a lecture. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: Lecture })
  create(@Body() createRequest: CreateLectureRequest): Promise<ILecture> {
    return this.lecturesService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Put(':id')
  @ApiOperation({
    summary: 'Update a lecture. Role: Admin, teacher',
  })
  @ApiOkResponse({ type: Lecture })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRequest: CreateLectureRequest
  ): Promise<ILecture> {
    return this.lecturesService.update(id, createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific lecture. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.lecturesService.perish(id);
  }

  /**
   * TO DO: Delete all lectures by class id
   * Class not implemented yet
   */
}
