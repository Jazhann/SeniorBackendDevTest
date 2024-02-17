import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/infraestructure/controllers/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import env from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: env.clientId,
        brokers: env.brokers,
      },
      consumer: {
        groupId: env.groupId,
      },
    },
  });
  await app.listen();
  Logger.log(`🚀 Product Catalog Service is running `);
}

bootstrap();
