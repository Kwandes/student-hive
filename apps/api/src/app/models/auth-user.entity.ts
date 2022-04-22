import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IAuthUser, Role } from '@student-hive/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('auth-users')
export class AuthUser extends Base implements IAuthUser {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  authUserId: string;

  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Role, default: Role.student })
  role: Role;
}
