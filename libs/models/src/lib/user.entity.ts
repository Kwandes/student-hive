import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IUser } from '@student-hive/interfaces';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base implements IUser {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @ApiModelProperty()
  @Column({ length: 30, nullable: true })
  name: string;

  @ApiModelProperty()
  @Column({ length: 50, nullable: true })
  lastname: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  birthdate: Date;

  // Reference the parent. The reltionship is already bidirectional but only when done through TypeOrm QueryBuilder, the field authUser is not relfected in the DB
  @ApiModelProperty()
  @Column({ type: 'uuid' })
  authUserId: string;

  @ApiModelProperty()
  @OneToOne(() => AuthUser, (authUser: AuthUser) => authUser.user, {
    onDelete: 'CASCADE', // supposed to propagate whatever changes happen to the related entity onto this one. Does not for delete...
    orphanedRowAction: 'delete', // delete the child entity if all of the references to it are deleted, supposedly. Seems to do nothing. I love SQL and ORMs...
    eager: true, // always fully include related entity when fetching the user.
  })
  authUser: AuthUser;
}
