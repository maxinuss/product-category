import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from "./category.schema";
import { CategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}

  async findAll(): Promise<Category[]> {
    return this.model.find().exec();
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    return new this.model(categoryDto).save();
  }

  async update(id: string, categoryDto: CategoryDto): Promise<Category|null> {
    return this.model.findByIdAndUpdate(id, categoryDto, { new: true });
  }

  async findOne(id: string): Promise<Category|null> {
    return this.model.findById(id);
  }

  async delete(id: string) {
    return this.model.deleteOne({ id });
  }
}
