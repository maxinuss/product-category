import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from "./product.schema";
import { ProductDto } from "./product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }

  async create(productDto: ProductDto): Promise<Product> {
    return new this.model(productDto).save();
  }

  async update(id: string, productDto: ProductDto): Promise<Product|null> {
    return this.model.findByIdAndUpdate(id, productDto, { new: true });
  }

  async findOne(id: string): Promise<Product|null> {
    return this.model.findById(id);
  }

  async delete(id: string) {
    return this.model.deleteOne({ id });
  }
}
