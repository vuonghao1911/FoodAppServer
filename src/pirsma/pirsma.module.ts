import { Global, Module } from '@nestjs/common';
import { PirsmaService } from './pirsma.service';
@Global()
@Module({
  providers: [PirsmaService],
  exports: [PirsmaService],//other modules can use PrismaService
})
export class PirsmaModule { }
