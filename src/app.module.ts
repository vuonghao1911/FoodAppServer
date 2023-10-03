import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PirsmaModule } from './pirsma/pirsma.module';
import { PirsmaService } from './pirsma/pirsma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PriceModule } from './price/price.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, PirsmaModule, AuthModule, ProductModule, OrderModule, PriceModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PirsmaService],
})
export class AppModule { }
