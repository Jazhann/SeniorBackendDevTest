import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ApiGatewayModule } from './app/infraestructure/controllers/apiGateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import env from './config';

async function bootstrap() {
  const globalPrefix = 'api';
  const app = await NestFactory.create(ApiGatewayModule);
  const config = new DocumentBuilder()
    .setTitle('Api Gateway')
    .setDescription('Ecommerce Api Gateway')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);

  app.connectMicroservice<MicroserviceOptions>({
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
  await app.startAllMicroservices();

  app.setGlobalPrefix(globalPrefix);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.use(helmet());

  const port = env.port || 3003;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`Swagger is running on: http://localhost:${port}/api/docs`);
}

bootstrap();
