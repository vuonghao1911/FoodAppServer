import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../auth/strategy';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
