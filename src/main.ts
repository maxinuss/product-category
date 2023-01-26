import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { LogService } from './common/services/log.service';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

console.log('env: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'LOCAL') {
  const logger = new LogService();
  async function bootstrapRest() {
    const app = await NestFactory.create(RestModule);
    app.enableCors();
    await app.listen(process.env.APP_HTTP_PORT!);
  }

  bootstrapRest().then(() => logger.info('Rest started'));
} else {
  async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(RestModule);
    app.enableCors();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }

  module.exports.handler = async (
    event: any,
    context: Context,
    callback: Callback,
  ) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  };
}








