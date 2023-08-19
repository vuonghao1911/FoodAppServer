import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator"
import { AuthAccountDTO } from "./auth.account.dto";

//Define a "type" of "authentication request"
export class AuthUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firsName: string;
    @IsString()
    lastName: string;
    @IsString()
    @IsNotEmpty()
    password: string;

}