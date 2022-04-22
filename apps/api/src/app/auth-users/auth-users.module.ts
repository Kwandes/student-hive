import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from '../models/auth-user.entity';
import { AuthUsersService } from './auth-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUsersService],
  exports: [AuthUsersService],
})
export class AuthUsersModule {}
