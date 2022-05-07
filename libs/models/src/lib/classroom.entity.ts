import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IClassroom } from '@student-hive/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { Base } from './base.entity';

@Entity('classrooms')
export class Classroom extends Base implements IClassroom {

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  classroomId!: string;

  @ApiModelProperty()
  @Column({ length: 12})
  name!: string;

}
