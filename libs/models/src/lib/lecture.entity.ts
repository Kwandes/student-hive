import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ILecture } from '@student-hive/interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Base } from './base.entity';

@Entity('lectures')
export class Lecture extends Base implements ILecture {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  lectureId!: string;

  @ApiModelProperty()
  @Column()
  start!: Date;

  @ApiModelProperty()
  @Column()
  end!: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.lecture, {
    cascade: true, // propagate changes to the associated attendances
    nullable: true,
  })
  attendances?: Attendance[];

  /*
  Class and Reader not implemented yet gonna do this later

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @Column({ type: 'uuid' })
  classId!: string;

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @Column({ type: 'uuid' })
  readerId!: string;
  */
}
