import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from "./category.schema";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}

  async findAll(): Promise<Category[]> {
    return this.model.find().exec();
  }
}
