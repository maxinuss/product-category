import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
class ConfigService {
  constructor(readonly env: any) { }

  public getDatabaseConfig() {
    const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } = this.env;

    return MongooseModule.forRoot(
      `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/?retryWrites=true&w=majority`
    );
  }
}

export const configService = new ConfigService(process.env);
