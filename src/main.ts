import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger';
import { config } from 'config/config';
import { WinstonModule } from 'nest-winston';
import { winstonModuleOptions } from './logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonModuleOptions),
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  swagger(app);

  await app.listen(config.Port);
}

void bootstrap();
