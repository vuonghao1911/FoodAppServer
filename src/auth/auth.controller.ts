import { Controller, Post, Req, Body, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDTO } from "./dto/auth.user.dto";
import { AuthAccountDTO } from "./dto/auth.account.dto";
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
    login(@Body() authDTO: AuthAccountDTO) {
        return this.authService.login(authDTO);
    }
    @Post("refresh-token")
    RefreshToken(@Body("refreshToken") refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }
}
