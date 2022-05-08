import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IClass } from '@student-hive/interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Lecture } from './lecture.entity';

@Entity('classes')
export class Class extends Base implements IClass {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  classId!: string;

  @ApiModelProperty({ example: 'SD22W' })
  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Lecture, (lecture) => lecture.class, {
    cascade: true, // propagate changes to the associated lectures
    nullable: true,
  })
  lectures?: Lecture[];
}
