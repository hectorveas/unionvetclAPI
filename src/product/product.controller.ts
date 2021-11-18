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
  Query,
  Res,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/guards/decorators/public.decorator';
import { Roles } from 'src/auth/guards/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { CreateProductDTO, UpdateProductDTO, FilterProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //@Roles(Role.ADMIN)
  @Post()
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  //@Public()
  @Get('paginate')
  async getProductsPaginate(@Res() res, @Query() params: FilterProductDTO) {
    const product = await this.productService.getProductsPaginate(params);
    return res.status(HttpStatus.OK).json(product);
  }

  //@Public()
  @Get()
  async getProducts(@Res() res) {
    const product = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(product);
  }

  //@Roles(Role.ADMIN)
  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  //@Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteProduct(@Res() res, @Param('id') id) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      product,
    });
  }

  //@Roles(Role.ADMIN)
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
