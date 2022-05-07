import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsNotEmpty, IsString } from "class-validator";
import { ICreateClassroomRequest } from "./classroom.interface";

export class CreateClassroomRequest implements ICreateClassroomRequest {
    @ApiModelProperty({ example: 'GBG.A248' })
    @IsNotEmpty()
    name!: string;
  }