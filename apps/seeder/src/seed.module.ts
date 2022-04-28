import { AuthUser, User } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';
import { AuthUsersSeederService } from './services/auth-users.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([AuthUser, User]),
      ],
      providers: [
        Logger,
        SeedService,
        AuthUsersSeederService,
        UsersSeederService,
      ],
      exports: [SeedService],
    };
  }
}