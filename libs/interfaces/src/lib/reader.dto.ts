import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { ReaderStatus } from './reader-status.enum';
import { ICreateReaderRequest } from './reader.interface';

export class CreateReaderRequest implements ICreateReaderRequest {
  @ApiModelProperty({ example: '00:1b:63:84:45:e6' })
  @MaxLength(18)
  @IsNotEmpty()
  mac!: string;

  @ApiModelProperty({ example: ReaderStatus.connected })
  @IsNotEmpty()
  status!: ReaderStatus;
  
  @ApiModelProperty({ example: true })
  @IsNotEmpty()
  isEnabled!: boolean;

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @IsOptional()
  @IsUUID()
  classroomId!: string;
}
