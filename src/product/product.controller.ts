import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  @Get()
  async getProducts(@Res() res) {
    const product = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(product);
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/:id')
  async deleteProduct(@Res() res, @Param('id') id) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      product,
    });
  }

  @Put('/:id')
  async updateProduct(
    @Res() res,
    @Body() updateProductDTO: UpdateProductDTO,
    @Param('id') id,
  ) {
    const product = await this.productService.updateProduct(
      id,
      updateProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      product,
    });
  }
}
