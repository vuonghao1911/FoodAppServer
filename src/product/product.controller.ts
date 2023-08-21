import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.creat.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {

    }

    @Post('create')
    async createNewProduct(@Body() product: ProductCreateDto) {
        return this.productService.createProduct(product)
    }


    @Delete(':id')
    async deleteProductById(@Body() product: ProductCreateDto) {
        return this.productService.createProduct(product)
    }


}
