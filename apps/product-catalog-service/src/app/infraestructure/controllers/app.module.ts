import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCatalogModule } from './productCatalog.module';
import { Product } from '@ecommerce/models';
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
      entities: [Product],
      synchronize: true,
    }),
    ProductCatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
