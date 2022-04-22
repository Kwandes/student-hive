import { IAuth, Role } from '@student-hive/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('auth')
export class Auth extends Base implements IAuth {
  @PrimaryGeneratedColumn('uuid')
  authId: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.admin })
  role: Role;
}
