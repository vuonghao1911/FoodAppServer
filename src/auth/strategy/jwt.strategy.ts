import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PirsmaService } from "../../pirsma/pirsma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        public prismaService: PirsmaService) {
        super({
            //token string is added to every request(except login / register)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }
    async validate(payload: { id: number; email: string }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.id
            }
        })
        delete user.updatedAt
        delete user.createdAt
        return user;
    }
}

