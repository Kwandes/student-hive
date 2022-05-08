import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ILecture } from '@student-hive/interfaces';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Base } from './base.entity';
import { Class } from './class.entity';

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

  @ApiModelProperty()
  @ManyToOne(() => Class, (associatedClass) => associatedClass.lectures, {
    onDelete: 'CASCADE',
  }) // when associated lecture gets delated, the attendance entry should get removed as well
  class!: Class;

  // TODO - implement reader relationship once reader entity is implemneted
}
