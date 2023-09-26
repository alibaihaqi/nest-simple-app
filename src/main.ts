import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function runApplication() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Whitelist is used to filter the request body property that sent to the server but we don't define
      whitelist: true,
    }),
  );
  await app.listen(process.env.NEST_PORT || 3000);
}

runApplication();
