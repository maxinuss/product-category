import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from "./product.schema";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }
}
