import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cookieParser
  app.use(cookieParser());

  //Setting up CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then()
  .catch((error) => {
    console.log(error);
  });
