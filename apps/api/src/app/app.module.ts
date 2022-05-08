import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendancesModule } from './attendances/attendances.module';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './classes/classes.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { configService } from './config/config.service';
import { LecturesModule } from './lectures/lectures.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    AuthUsersModule,
    ClassroomsModule,
    UsersModule,
    AttendancesModule,
    LecturesModule,
    ClassesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
