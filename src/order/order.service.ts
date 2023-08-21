import { BadRequestException, Injectable } from '@nestjs/common';
import { PirsmaService } from 'src/pirsma/pirsma.service';
import { OrderCreateDTO } from './dto/order.create.dto';

@Injectable()
export class OrderService {
    constructor(private prismaSevice: PirsmaService) { }

    async createOrder(userId: number, order: Array<OrderCreateDTO>): Promise<any> {
        try {
            const newOrder = await this.prismaSevice.order.create({
                data: {
                    userId: userId,
                    orderdetails: {
                        create: order
                    }
                }, include: {
                    orderdetails: true
                }
            })
            return newOrder

        } catch (error) {
            throw new BadRequestException()
        }
    }
}
