import { BadRequestException, Injectable } from '@nestjs/common';
import { PirsmaService } from 'src/pirsma/pirsma.service';
import { ProductCreateDto } from './dto/product.creat.dto';

@Injectable()
export class ProductService {

    constructor(private prismaService: PirsmaService) {
    }
    async createProduct(productCreate: ProductCreateDto) {

        try {
            const product = this.prismaService.product.create({
                data: {
                    name: productCreate.name,
                    description: productCreate.descreption,
                    url: productCreate.url
                },
            })
            return product
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteProduct(productId: number) {

        try {
            return this.prismaService.product.delete({
                where: {
                    id: productId
                }
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateStatus(productId: number, status: boolean) {

        try {
            return this.prismaService.product.update({
                where: {
                    id: productId
                },
                data: {
                    status: status
                }
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

}
