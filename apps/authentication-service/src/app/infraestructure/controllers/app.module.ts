import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication.module';
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
      entities: [User, Order, Product],
      synchronize: true,
    }),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
