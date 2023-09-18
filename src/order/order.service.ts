import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    async getAllOrderByIdUser(userId: number) {
        try {
            const listOrder = await this.prismaSevice.order.findMany({
                include: {
                    orderdetails: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    url: true
                                },
                            }
                        }
                    }
                },
                where: {
                    userId: userId,
                }
            })
            return listOrder
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
    async getAllOrderByProductId(userId: number, productId: number) {
        try {
            const listOrder = await this.prismaSevice.order.findMany({
                include: {
                    orderdetails: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    url: true
                                },
                            }
                        }
                    }
                },
                where: {
                    userId: userId,
                    orderdetails: {
                        some: {
                            productId: {
                                equals: productId
                            }
                        }
                    }
                }
            })
            return listOrder
        } catch (error) {
            console.log(error)
            throw new NotFoundException(error.message)
        }
    }

    async deleteItemOrder(orderId: number, productId: number) {
        try {
            const order = await this.prismaSevice.order.findUnique({
                where: {
                    id: orderId,
                    status: 0
                }

            })
            if (!order) {
                throw new ForbiddenException("can not delete order")
            }
            return this.prismaSevice.orderDetails.delete({
                where: {
                    productId_orderId: {
                        orderId: orderId,
                        productId: productId
                    }
                },
            })

        } catch (error) {
            console.log(error)
            throw new NotFoundException(error.message)
        }
    }
}
