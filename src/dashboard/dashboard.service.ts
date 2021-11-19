import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts() {
    const products = await this.productModel.find().limit(10).sort({stock: 1});
    return products.map(product => {
        return {
            name: product.name,
            stock: product.stock,
            updatedAt: product.updatedAt,
        }; 
    });
  }
}
