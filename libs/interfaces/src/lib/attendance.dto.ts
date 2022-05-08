import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ICreateAttendanceRequest } from './attendance.interface';

export class CreateAttendanceRequest implements ICreateAttendanceRequest {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  @IsUUID()
  authUserId!: string;

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  @IsUUID()
  lectureId!: string;
}

export class GetAttendanceQuery {
  @ApiModelProperty({
    description:
      'Records that were create don the given date. ISO-8601 valid date string. Time is ignored',
    example: '2022-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiModelProperty({
    description: 'Records from a specific class',
    example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  classId?: string;
}
