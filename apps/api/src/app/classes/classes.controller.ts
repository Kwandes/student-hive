import { Class } from '@models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClassRequest, IClass, Role } from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ClassesService } from './classes.service';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('')
  @ApiOperation({
    summary: 'Get a list of all classes. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: [Class] })
  async getAll(): Promise<IClass[]> {
    return this.classesService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles()
  @Get(':id')
  @ApiOperation({ summary: 'Get a a class by id. Role: Any' })
  @ApiOkResponse({ type: Class })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IClass> {
    return this.classesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Post('')
  @ApiOperation({
    summary: 'Create an class. Role: Teacher, Admin',
  })
  @ApiOkResponse({ type: Class })
  create(@Body() createRequest: CreateClassRequest): Promise<IClass> {
    return this.classesService.create(createRequest);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary:
      'Delete a specific class information. Does not remove auth class info. Role: Teacher, Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.classesService.perish(id);
  }
}
