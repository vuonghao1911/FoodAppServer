import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator"

//Define a "type" of "authentication request"
export class AuthAccountDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}