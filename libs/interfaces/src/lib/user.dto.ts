import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ICreateUserRequest, IUpdateUserRequest } from './user.interface';

export class CreateUserRequest implements ICreateUserRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @ApiModelProperty()
  @IsDateString()
  birthdate: Date;

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  @IsUUID()
  authUserId: string;
}

export class updateUserRequest implements IUpdateUserRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  name?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @ApiModelProperty()
  @IsDateString()
  @IsOptional()
  birthdate?: Date;
}
