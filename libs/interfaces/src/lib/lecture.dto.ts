import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ICreateLectureRequest } from './lecture.interface';

export class CreateLectureRequest implements ICreateLectureRequest {
  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  start!: Date;

  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  end!: Date;

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsNotEmpty()
  @IsUUID()
  classId!: string;
}
export class GetLecturesQuery {
  @ApiModelProperty({
    description: 'Lectures from a specific class',
    example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  classId?: string;
}
