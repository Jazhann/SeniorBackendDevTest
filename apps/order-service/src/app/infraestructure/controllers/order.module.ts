import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateOrder } from '../../aplication/createOrder.service';
import { OrderRepository } from '../repositories/order.repository';
import { OrderIRepository } from '../../domain/order.i.repository';
import { Order } from '@ecommerce/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateOrder } from '../../aplication/updateOrder.service';
import config from '../../../config';
import { KAFKA_CLIENT } from '@ecommerce/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config.clientId,
            brokers: config.brokers,
          },
          consumer: {
            groupId: config.groupId,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    {
      provide: CreateOrder,
      useFactory(orderRepository: OrderIRepository) {
        return new CreateOrder(orderRepository);
      },
      inject: [OrderRepository],
    },
    {
      provide: UpdateOrder,
      useFactory(orderRepository: OrderIRepository) {
        return new UpdateOrder(orderRepository);
      },
      inject: [OrderRepository],
    },
  ],
})
export class OrderModule {}
