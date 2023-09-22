import { Controller, Post, Req, Body, ParseIntPipe, Res, ForbiddenException, Next, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDTO } from "./dto/auth.user.dto";
import { AuthAccountDTO } from "./dto/auth.account.dto";
import { Response, NextFunction } from "express"
//import a "folder"
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }
    @Post("register",) //register a new user          
    register(@Body() authUserDTO: AuthUserDTO) {
        //not validate using class-validator AND class-transformer        
        return this.authService.register(authUserDTO);
    }
    // POST: .../auth/login
    @Post("login")
    async login(@Res() res: Response, @Body() authDTO: AuthAccountDTO) {

        try {
            const usr = await this.authService.login(authDTO)
            console.log(usr)

            return res.status(200).json({ data: usr })
        } catch (error) {
            console.log(error);


            return res.status(500).send(error.response)

        }
    }
    @Post("refresh-token")
    RefreshToken(@Body("refreshToken") refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}
