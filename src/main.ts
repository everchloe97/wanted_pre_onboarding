import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { AppModule } from './resources/app/app.module';
import { SwaggerConfig } from './config';
import { HttpExceptionFilter } from './http';

const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //app.use(helmet());
  app.use(compression());
  app.enableVersioning();

  app.enableCors();
  // app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use('/public', express.static(path.join(__dirname, '../public')));

  SwaggerConfig(app, AppModule.apiVersion);
  
  await app.listen(AppModule.port);
  return AppModule.port;
}
bootstrap();
