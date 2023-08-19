import { AuthGuard } from '@nestjs/passport';
export class AccsesJwtGuard extends AuthGuard('jwt') {

}