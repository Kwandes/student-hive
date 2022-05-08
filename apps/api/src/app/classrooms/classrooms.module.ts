import { Classroom } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
