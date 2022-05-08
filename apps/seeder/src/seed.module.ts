import { Attendance, AuthUser, Classroom, Lecture, User } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';
import { AttendancesSeederService } from './services/attendances.service';
import { AuthUsersSeederService } from './services/auth-users.service';
import { ClassroomSeederService } from './services/classrooms.service';
import { LecturesSeederService } from './services/lectures.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([
          AuthUser,
          User,
          Attendance,
          Classroom,
          Lecture,
        ]),
      ],
      providers: [
        Logger,
        SeedService,
        AuthUsersSeederService,
        UsersSeederService,
        AttendancesSeederService,
        ClassroomSeederService,
        LecturesSeederService,
      ],
      exports: [SeedService],
    };
  }
}
