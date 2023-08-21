import { Body, Controller, ParseArrayPipe, Post, Req, UseGuards } from '@nestjs/common';
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
    async createNewOrder(@GetUser('id') userId: number, @Body(new ParseArrayPipe({ items: OrderCreateDTO })) order: Array<OrderCreateDTO>) {
        return this.orderService.createOrder(userId, order)
    }
}
