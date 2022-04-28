import { AuthUser, User } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsersService } from './auth-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser, User])],
  providers: [AuthUsersService],
  exports: [AuthUsersService],
})
export class AuthUsersModule {}
