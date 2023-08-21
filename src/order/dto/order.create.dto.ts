import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator"


//Define a "type" of "authentication request"
export class OrderCreateDTO {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}