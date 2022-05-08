import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ICreateClassRequest } from './class.interface';

export class CreateClassRequest implements ICreateClassRequest {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  name!: string;
}

export class UpdateClassRequest implements ICreateClassRequest {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  name!: string;
}
