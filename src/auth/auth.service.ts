import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PirsmaService } from 'src/pirsma/pirsma.service';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
import * as argon from 'argon2';
import { AuthUserDTO } from './dto/auth.user.dto';
import { AuthAccountDTO } from './dto/auth.account.dto';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PirsmaService,
        private jwtService: JwtService,
        private configService: ConfigService

    ) {

    }
    async register(authUserDTO: AuthUserDTO) {
        const hashedPassword = await argon.hash(authUserDTO.password)
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authUserDTO.email,

                    firstName: authUserDTO.firsName,
                    lastName: authUserDTO.lastName,
                },
                //only select id, email, createdAt
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }

            })
            if (user) {
                const account = await this.prismaService.account.create({
                    data: {
                        username: authUserDTO.email,
                        password: hashedPassword,
                        userId: user.id
                    }
                })
            }
            return await this.signJwtToken(user.id, user.email)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async login(authAccountDTO: AuthAccountDTO) {
        //find user with input email
        const user = await this.prismaService
            .account.findUnique({
                where: {
                    username: authAccountDTO.email
                }
            })
        if (!user) {
            throw new ForbiddenException(
                'User not found'
            )
        }
        const userLogin = await this.prismaService.user.findUnique({
            where: {
                id: user.userId
            }
        })
        delete userLogin.createdAt
        delete userLogin.updatedAt
        const passwordMatched = await argon.verify(
            user.password,
            authAccountDTO.password
        )
        if (!passwordMatched) {
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        const jwt = await this.signJwtToken(user.id, user.username)
        const refreshJwt = await this.signJwtRefreshToken(user.id, user.username)
        return {
            ...userLogin,
            ...jwt,
            ...refreshJwt,
        }
    }

    async signJwtToken(userId: number, email: string)
        : Promise<{ accessToken: string }> {
        const payload = {
            id: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }
    async signJwtRefreshToken(userId: number, email: string)
        : Promise<{ refreshToken: string }> {
        const payload = {
            id: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '40m',
            secret: this.configService.get('JWT_REFRESH_SECRET')
        })
        return {
            refreshToken: jwtString,
        }
    }
    async refreshToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get("JWT_REFRESH_SECRET")
            })
            console.log(payload)
            if (!payload) {
                throw new ForbiddenException("Invalid refresh token")
            }
            const newAccsessToken = await this.signJwtToken(payload.id, payload.email)
            const newRefreshToken = await this.signJwtRefreshToken(payload.id, payload.email)
            return {
                ...newAccsessToken,
                ...newRefreshToken,
                message: "Refresh token successfully"

            }
        } catch (error) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }
}
