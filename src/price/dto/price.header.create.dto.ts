import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator"


//Define a "type" of "authentication request"
export class PriceHeaderCreateDto {
    @IsString()
    starDate: string;
    @IsString()
    endDate: string;
    @IsBoolean()
    @IsOptional()
    status?: boolean
}