import { ProductController } from "../../../src/modules/product/product.controller";
import { ProductService } from "../../../src/modules/product/product.service";
import { Test } from "@nestjs/testing";
import { getModelToken } from '@nestjs/mongoose';
import { Product } from "../../../src/modules/product/product.schema";
import { ProductDto } from "../../../src/modules/product/product.dto";
import { Category } from "../../../src/modules/category/category.schema";
describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: Product,
        }
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    productController = moduleRef.get<ProductController>(ProductController);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [new Product()];
      jest.spyOn(productService, 'findAll').mockImplementation(
        () => new Promise((resolve) => resolve(result))
      );

      expect(JSON.stringify(await productController.list())).toBe(JSON.stringify(result));
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const category = new Category();
      category.name = 'test';
      category.image = 'test';
      category.description = 'test';

      const product = new Product();
      product.name = 'test';
      product.description = 'test';
      product.images = ['test'];
      product.price = 10.0;
      product.category = category;

      const body = new ProductDto();
      body.name = 'test';
      body.description = 'test';
      body.images = ['test'];
      body.price = 10.0;
      body.category = 'aaaaa';

      jest.spyOn(productService, 'create').mockImplementation(
        () => new Promise((resolve) => resolve(product))
      );

      expect(JSON.stringify(await productController.create(body))).toBe(JSON.stringify(product));
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const category = new Category();
      category.name = 'test';
      category.image = 'test';
      category.description = 'test';

      const product = new Product();
      product.name = 'test';
      product.description = 'test';
      product.images = ['test'];
      product.price = 10.0;
      product.category = category;

      const id = '1111';
      const body = new ProductDto();
      body.name = 'test 2';
      body.description = 'test 2';
      body.images = ['test 2'];
      body.price = 10.0;
      body.category = 'aaaaa';

      jest.spyOn(productService, 'update').mockImplementation(
        () => new Promise((resolve) => resolve(product))
      );

      expect(JSON.stringify(await productController.update(id, body))).toBe(JSON.stringify(product));
    });
  });

  describe('getOne', () => {
    it('should getOne product', async () => {
      const id = '1111';
      const result = new Product();

      jest.spyOn(productService, 'findOne').mockImplementation(
        () => new Promise((resolve) => resolve(result))
      );

      expect(JSON.stringify(await productController.getOne(id))).toBe(JSON.stringify(result));
    });
  });
});