import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator"


//Define a "type" of "authentication request"
export class PriceLineCreateDto {
    @IsNumber()
    price: number;
    @IsNumber()
    @IsNotEmpty()
    productId: number;
    @IsNotEmpty()
    @IsNumber()
    priceHeaderId: number

}