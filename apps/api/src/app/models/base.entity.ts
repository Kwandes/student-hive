// base.entity.ts
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IBase } from '@student-hive/interfaces';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
export abstract class Base implements IBase {
  @ApiModelProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiModelProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
