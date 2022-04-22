import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IAuth, Role } from '@student-hive/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('auth')
export class Auth extends Base implements IAuth {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  authId: string;

  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Role, default: Role.admin })
  role: Role;
}
