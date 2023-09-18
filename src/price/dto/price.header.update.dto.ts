import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator"


//Define a "type" of "authentication request"
export class PriceHeaderUpdateDto {
    @IsBoolean()
    @IsOptional()
    status?: boolean;
    @IsNotEmpty()
    @IsNumber()
    priceHeaderId: number
    @IsNotEmpty()
    @IsString()
    endDate: string

}