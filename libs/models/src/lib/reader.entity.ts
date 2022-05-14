import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IClassroom, IReader, ReaderStatus } from '@student-hive/interfaces';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Classroom } from './classroom.entity';

@Entity('readers')
export class Reader extends Base implements IReader {

  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  readerId!: string;

  @ApiModelProperty()
  @Column({ length: 18 })
  mac!: string;

  @ApiModelProperty({ example: ReaderStatus.connected })
  @Column({ type: 'enum', enum: ReaderStatus, default: ReaderStatus.connected })
  status!: ReaderStatus;

  @ApiModelProperty()
  @Column()
  isEnabled!: boolean;

  @ApiModelProperty({ required: false })
  @OneToOne(() => Classroom, { nullable: true })
  @JoinColumn({ name: 'classroomId' })
  classroom!: Classroom;

}
