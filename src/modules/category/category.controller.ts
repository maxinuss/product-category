import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from "./category.service";
import { ValidationPipe } from "../../common/validation.pipe";
import { CategoryDto } from "./category.dto";

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Get('/')
  async list() {
    return this.categoryService.findAll();
  }

  @Post('/')
  async create(@Body(new ValidationPipe()) body: CategoryDto) {
    return this.categoryService.create(body);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) body: CategoryDto) {
    return this.categoryService.update(id, body);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
