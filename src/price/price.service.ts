import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable } from '@nestjs/common';
import { PirsmaService } from 'src/pirsma/pirsma.service';
import { PriceHeaderCreateDto } from './dto/price.header.create.dto';
import { PriceLineCreateDto } from './dto/price.line.create.dto';
import { PriceHeaderUpdateDto } from './dto/price.header.update.dto';

@Injectable()
export class PriceService {
    constructor(private prismaService: PirsmaService) {

    }

    async createPriceHeader(userId: number, priceHeader: PriceHeaderCreateDto) {
        const startDate = new Date(priceHeader.starDate)
        const endDate = new Date(priceHeader.endDate)
        const prHeader = this.prismaService.priceHeader.create({
            data: {
                startDate: startDate,
                endDate: endDate,
                userIdCreate: userId,
                userIdUpdate: userId
            }
        })
        return prHeader
    }

    async createPriceLine(priceLine: PriceLineCreateDto) {
        try {
            const prHeader = this.prismaService.priceLine.create({
                data: {
                    price: priceLine.price,
                    priceHeaderId: priceLine.priceHeaderId,
                    productId: priceLine.productId
                }
            })
            return prHeader
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message)
        }

    }
    async deletePriceLine(priceLineId: number) {
        try {
            const { priceHeader, price } = await this.prismaService.priceLine.findFirst(
                {

                    select: {
                        id: true,
                        price: true,
                        priceHeader: {
                            select: {
                                id: true,
                                startDate: true,
                                endDate: true,
                                status: true
                            }
                        }
                    },
                    where: {
                        id: priceLineId
                    }
                }
            )
            if (priceHeader.status || new Date(new Date(priceHeader.endDate).getTime() - (60 * 60 * 4 * 10000)) < new Date()) {

                throw new BadRequestException("Can not delete ")
            }

            return this.prismaService.priceLine.delete({
                where: { id: priceLineId }
            })
        } catch (error) {
            throw new BadRequestException(error.response)
        }
    }

    async UpdatePriceHeader(userId: number, data: PriceHeaderUpdateDto): Promise<any> {
        const { status, endDate } = await this.prismaService.priceHeader.findUnique({
            where: {
                id: data.priceHeaderId
            }
        })

    }
}
