import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserNoteDTO } from './dto';
import { AccsesJwtGuard } from '../auth/guard';
import { Request } from 'express';



@Controller('user')
@UseGuards(AccsesJwtGuard)
export class UserController {

    constructor(private userService: UserService) { }
    @Get("api/users")
    async getUsers(@Req() request: Request, @Body() body: any): Promise<GetUserNoteDTO> {
        console.log(request)
        return await this.userService.getUsers()
    }

    @Post()
    async postUser(@Body() user: GetUserNoteDTO) {
        return user
    }
}
