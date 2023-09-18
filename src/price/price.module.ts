import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  providers: [PriceService],
  controllers: [PriceController]
})
export class PriceModule {}
