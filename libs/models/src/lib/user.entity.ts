import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IUser } from '@student-hive/interfaces';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { Base } from './base.entity';
import { Class } from './class.entity';

@Entity('users')
export class User extends Base implements IUser {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 30, nullable: true })
  name?: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 50, nullable: true })
  lastname?: string;

  @ApiModelProperty({ required: false })
  @Column({ nullable: true })
  birthdate?: Date;

  // Reference the parent. The reltionship is already bidirectional but only when done through TypeOrm QueryBuilder, the field authUser is not relfected in the DB
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @Column({ type: 'uuid' })
  authUserId!: string;

  @ApiModelProperty({ type: () => AuthUser, example: AuthUser })
  @OneToOne(() => AuthUser, (authUser: AuthUser) => authUser.user, {
    onDelete: 'CASCADE', // supposed to propagate whatever changes happen to the related entity onto this one. Does not for delete...
    orphanedRowAction: 'delete', // delete the child entity if all of the references to it are deleted, supposedly. Seems to do nothing. I love SQL and ORMs...
    eager: true, // always fully include related entity when fetching the user.
  })
  authUser!: AuthUser;

  @ManyToMany(() => Class)
  @JoinTable()
  classes!: Class[];
}
