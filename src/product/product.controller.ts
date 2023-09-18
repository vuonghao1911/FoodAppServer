import { Body, Controller, Delete, Param, ParseBoolPipe, ParseIntPipe, Patch, Post } from '@nestjs/common';
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
    async deleteProductById(@Param("id", ParseIntPipe) productId: number) {
        return this.productService.deleteProduct(productId)
    }

    @Patch('/status/:id')
    async updateStatus(@Param("id", ParseIntPipe) productId: number,
        @Body("status", ParseBoolPipe) status: boolean) {
        return this.productService.updateStatus(productId, status)
    }


}
