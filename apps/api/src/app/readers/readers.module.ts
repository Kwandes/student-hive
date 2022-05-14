import { Classroom, Reader } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reader, Classroom])],
  controllers: [ReadersController],
  providers: [ReadersService],
  exports: [ReadersService],
})
export class ReadersModule {}
