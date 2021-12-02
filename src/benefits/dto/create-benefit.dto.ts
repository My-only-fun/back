import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBenefitDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsBoolean()
    @ApiProperty()
    highlight: boolean;

}