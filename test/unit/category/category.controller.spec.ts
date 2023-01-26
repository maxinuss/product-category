import { CategoryController } from "../../../src/modules/category/category.controller";
import { CategoryService } from "../../../src/modules/category/category.service";
import { Test } from "@nestjs/testing";
import { getModelToken } from '@nestjs/mongoose';
import { Category } from "../../../src/modules/category/category.schema";
import { CategoryDto } from "../../../src/modules/category/category.dto";
describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: getModelToken('Category'),
          useValue: Category,
        }
      ],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [new Category()];
      jest.spyOn(categoryService, 'findAll').mockImplementation(
        () => new Promise((resolve) => resolve(result))
      );

      expect(JSON.stringify(await categoryController.list())).toBe(JSON.stringify(result));
    });
  });

  describe('create', () => {
    it('should create a category', async () => {
      const category = new Category();
      category.name = 'test';
      category.image = 'test';
      category.description = 'test';

      const body = new CategoryDto();
      body.name = 'test';
      body.description = 'test';
      body.image = 'test';

      jest.spyOn(categoryService, 'create').mockImplementation(
        () => new Promise((resolve) => resolve(category))
      );

      expect(JSON.stringify(await categoryController.create(body))).toBe(JSON.stringify(category));
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const category = new Category();
      category.name = 'test';
      category.image = 'test';
      category.description = 'test';

      const id = '1111';
      const body = new CategoryDto();
      body.name = 'test 2';
      body.description = 'test 2';
      body.image = 'test 2';

      jest.spyOn(categoryService, 'update').mockImplementation(
        () => new Promise((resolve) => resolve(category))
      );

      expect(JSON.stringify(await categoryController.update(id, body))).toBe(JSON.stringify(category));
    });
  });

  describe('getOne', () => {
    it('should getOne category', async () => {
      const id = '1111';
      const result = new Category();

      jest.spyOn(categoryService, 'findOne').mockImplementation(
        () => new Promise((resolve) => resolve(result))
      );

      expect(JSON.stringify(await categoryController.getOne(id))).toBe(JSON.stringify(result));
    });
  });
});