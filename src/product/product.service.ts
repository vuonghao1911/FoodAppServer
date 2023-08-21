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

}
