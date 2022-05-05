import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ICreateAttendanceRequest } from './attendance.interface';

export class CreateAttendanceRequest implements ICreateAttendanceRequest {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  @IsUUID()
  authUserId!: string;
}
