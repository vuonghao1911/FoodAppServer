import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PriceService } from './price.service';
import { AccsesJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { PriceHeaderCreateDto } from './dto/price.header.create.dto';
import { PriceLineCreateDto } from './dto/price.line.create.dto';

@UseGuards(AccsesJwtGuard)
@Controller('price')
export class PriceController {
    constructor(private priceService: PriceService) { }

    @Post("create")
    async createHeader(@GetUser("id") userId: number, @Body() priceHeader: PriceHeaderCreateDto) {
        return this.priceService.createPriceHeader(userId, priceHeader)
    }

    @Post("priceLine/create")
    async createHeaderLine(@Body() priceLine: PriceLineCreateDto) {
        return this.priceService.createPriceLine(priceLine)
    }
    @Get("priceLine/:id")
    async deletePriceLine(@Param("id", ParseIntPipe) priceLineId: number) {
        return this.priceService.deletePriceLine(priceLineId)
    }
}
