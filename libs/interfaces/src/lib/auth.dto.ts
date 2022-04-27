import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
} from './auth.interface';
import { Role } from './role.enum';

export class LoginRequest implements ILoginRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  username!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password!: string;
}

export class SignupRequest implements ISignupRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  email!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password!: string;
}

export class SignupRequestQuery {
  @ApiModelProperty({
    type: 'enum',
    enum: Object.keys(Role),
    required: false,
    default: Role.student,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class LoginResponse implements ILoginResponse {
  @ApiModelProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwic3ViIjoiYjIzZDA2YmYtMzhmNi00Njk1LTkzNjEtMTE5YTVjMWU3ODQ5IiwiaWF0IjoxNjUwNDk3MTc3LCJleHAiOjE2NTA1ODM1Nzd9.xQy16DAl1zlszQdCQZEbNoadOOdxtAAegShlkd2PF-I',
  })
  accessToken!: string;

  @ApiModelProperty({ type: 'enum', enum: Object.keys(Role) })
  role!: Role;
}
