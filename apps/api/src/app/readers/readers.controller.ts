import { Classroom, Reader } from '@models';
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
  CreateClassroomRequest,
  CreateReaderRequest,
  IClassroom,
  IReader,
  Role,
} from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ReadersService } from './readers.service';

@ApiTags('Readers')
@Controller('readers')
export class ReadersController {
  constructor(private readonly readersService: ReadersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('')
  @ApiOperation({
    summary: 'Get a list of all readers. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: [Reader] })
  async getAll(): Promise<IReader[]> {
    return this.readersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a reader by id. Role: Teacher, Admin' })
  @ApiOkResponse({ type: Reader })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IReader> {
    return this.readersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary: 'Create a reader. Role: Any',
  })
  @ApiOkResponse({ type: Reader })
  create(@Body() createRequest: CreateReaderRequest): Promise<IReader> {
    return this.readersService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Put(':id')
  @ApiOperation({
    summary: 'Update a reader. Role: Admin, teacher',
  })
  @ApiOkResponse({ type: Reader })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRequest: CreateReaderRequest
  ): Promise<IReader> {
    return this.readersService.update(id, createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific reader information. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.readersService.perish(id);
  }
}
