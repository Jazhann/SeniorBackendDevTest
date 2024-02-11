/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/infraestructure/controllers/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product-catalog-service',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'product-catalog-service-consumer',
      },
    },
  });
  await app.listen();
  Logger.log(`🚀 Product Catalog Service is running `);
}

bootstrap();
