import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { configService } from "./config/app.config";
import { CategoryModule } from "./modules/category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    configService.getDatabaseConfig(),
    HealthModule,
    CategoryModule
  ],
})
export class RestModule { }
