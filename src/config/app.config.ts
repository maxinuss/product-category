import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
class ConfigService {
  constructor(readonly env: any) { }

  public isProduction() {
    return this.env.NODE_ENV === 'PROD';
  }

  public getDatabaseConfig() {
    const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = this.env;
    console.log(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME);
    return MongooseModule.forRoot(
      `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
    );
  }
}

export const configService = new ConfigService(process.env);
