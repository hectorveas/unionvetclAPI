import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = new this.productModel(createProductDTO);
    return newProduct.save();
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    const product = await this.productModel.findByIdAndDelete(id);
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, { $set: updateProductDTO }, { new: true })
      .exec();
    return updatedProduct;
  }
}
