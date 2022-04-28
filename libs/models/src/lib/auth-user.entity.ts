import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IAuthUser, Role } from '@student-hive/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('auth-users')
export class AuthUser extends Base implements IAuthUser {
  @ApiModelProperty({ example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5' })
  @PrimaryGeneratedColumn('uuid')
  authUserId!: string;

  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email!: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password!: string;

  @ApiModelProperty({ example: Role.student })
  @Column({ type: 'enum', enum: Role, default: Role.student })
  role!: Role;

  // The cascade options don't seem to be working properly.
  // Deletion of child (user) correctly results int he user field being set to <null>, but deletion of parent (AuthUser) does not affect the child at all.
  // Because of this the service explictly deletes the user.
  // I kept all of the options wiht their comments to help future devs troubleshoot.

  @ApiModelProperty({
    example: '9b34ea5c-5c02-4fec-8e01-080d0fee40a5',
    required: false,
  })
  @OneToOne(() => User, (user: User) => user.authUser, {
    cascade: true, // propagate changes of this object to the associated user entity, but not deletion
    onDelete: 'SET NULL', // will cause the userId field to be set to null if user gets deleted
    nullable: true, // allows the field to have a null value,
  })
  @JoinColumn({ name: 'userId' })
  user?: User;
}
