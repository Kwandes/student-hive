// base.entity.ts
import { IBase } from '@student-hive/interfaces';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base implements IBase {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
