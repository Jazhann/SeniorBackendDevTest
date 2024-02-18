import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrder } from '../../aplication/createOrder.service';
import { UpdateOrder } from '../../aplication/updateOrder.service';
import { KAFKA_CLIENT, KAFKA_ORDER_TYPES, KAFKA_TOPICS, KAFKA_USER_TYPES } from '@ecommerce/constants';

@Controller()
export class OrderController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
    @Inject(CreateOrder) private createOrder: CreateOrder,
    @Inject(UpdateOrder) private updateOrder: UpdateOrder
  ) {}

  /**
   * Handles incoming messages for creating orders.
   * @param message The payload of the message received.
   */
  @MessagePattern(KAFKA_TOPICS.ORDER_MESSAGES)
  handleCreateOrder(@Payload() message) {
    switch (message.type) {
      case KAFKA_ORDER_TYPES.CREATE_ORDER:
        return this.createOrder.run(message.data);
    }
  }

  /**
   * Handles incoming events for updating orders, triggered by user logins.
   * @param message The payload of the event received.
   */
  @EventPattern(KAFKA_TOPICS.USER_EVENTS)
  handleUpdateOrderUser(@Payload() message) {
    switch (message.type) {
      case KAFKA_USER_TYPES.USER_LOGED:
        return this.updateOrder.run(message.data);
    }
  }

  /**
   * Subscribes to Kafka topics on module initialization.
   */
  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.ORDER_MESSAGES);
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.PRODUCT_EVENTS);
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.USER_EVENTS);
  }
}
