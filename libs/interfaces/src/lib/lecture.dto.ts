import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { ICreateLectureRequest } from './lecture.interface';

export class CreateLectureRequest implements ICreateLectureRequest {
  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  end: Date;
}
