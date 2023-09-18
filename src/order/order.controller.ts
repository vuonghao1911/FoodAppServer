import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDTO } from './dto/order.create.dto';
import { AccsesJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(AccsesJwtGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {

    }
    @Post("create")
    async createNewOrder(@GetUser('id') userId: number,
        @Body(new ParseArrayPipe({ items: OrderCreateDTO })) order: Array<OrderCreateDTO>) {
        return this.orderService.createOrder(userId, order)
    }

    @Get("getAll")
    async getAllOrder(@GetUser('id') userId: number) {
        return this.orderService.getAllOrderByIdUser(userId)
    }

    @Get("products/:productId")
    async getAllOrderByProductId(@GetUser('productId') userId: number,
        @Param("id", ParseIntPipe) productId: number) {
        return this.orderService.getAllOrderByProductId(userId, productId)
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(":id/products/:productId")
    async deleteItemOrder(@Param("productId", ParseIntPipe) productId: number,
        @Param("id", ParseIntPipe) orderId: number) {
        return this.orderService.deleteItemOrder(orderId, productId)
    }

}
