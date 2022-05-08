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
import {
  CreateUserRequest,
  IJwtInfo,
  ILecture,
  IUser,
  Role,
  UpdateUserRequest,
} from '@student-hive/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Lectures')
@Controller('lectures')
export class LecturesController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.teacher, Role.admin)
  @Get('/class/:id')
  @ApiOperation({
    summary: 'Get a list of all lectures for a class. Roles: Teacher, Admin',
  })
  @ApiOkResponse({ type: [Lecture] })
  async getByClass(): Promise<ILecture[]> {
    return null;
  }
}
