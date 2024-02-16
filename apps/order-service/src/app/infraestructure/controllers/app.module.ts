import { Module } from '@nestjs/common';

import { OrderModule } from './order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, Product, User } from '@ecommerce/models';
import config from '../../../config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.dbType,
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUserName,
      password: config.dbPassword,
      database: config.dbDatabase,
      entities: [Order, Product, User],
      synchronize: true,
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
