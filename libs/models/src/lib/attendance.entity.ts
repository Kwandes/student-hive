import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IAttendance } from '@student-hive/interfaces';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { Base } from './base.entity';

@Entity('attendances')
export class Attendance extends Base implements IAttendance {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  attendanceId!: string;

  @ApiModelProperty()
  @ManyToOne(() => AuthUser, { onDelete: 'CASCADE' }) // when associated auth user gets delated, the attendance entry should get removed as well
  authUser!: AuthUser;

  // TODO - add lecture relationship. Requires lecture entity to be implemented
}
