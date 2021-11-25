import {IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BenefitsForUserDTO {
    @IsUUID('all')
    @ApiProperty()
    id: string;
}