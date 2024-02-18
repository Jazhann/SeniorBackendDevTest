import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { GetProductCatalog } from '../../aplication/getProductCatalog.service';
import { CreateProduct } from '../../aplication/createProduct.service';
import { RemoveProduct } from '../../aplication/removeProduct.service';
import { GetProduct } from '../../aplication/getProduct.service';
import { UpdateProduct } from '../../aplication/updateProduct.service';
import { KAFKA_CLIENT, KAFKA_ORDER_TYPES, KAFKA_PRODUCT_TYPES, KAFKA_TOPICS } from '@ecommerce/constants';

@Controller('')
export class ProductCatalogController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
    @Inject(GetProductCatalog) private getProductCatalog: GetProductCatalog,
    @Inject(GetProduct) private getProduct: GetProduct,
    @Inject(CreateProduct) private createProduct: CreateProduct,
    @Inject(UpdateProduct) private updateProduct: UpdateProduct,
    @Inject(RemoveProduct) private removeProduct: RemoveProduct
  ) {}

  /**
   * Handles incoming messages for product-related messages.
   * @param message The message payload containing the product event data.
   * @returns The result of the product operation based on the event type.
   */
  @MessagePattern(KAFKA_TOPICS.PRODUCT_MESSAGES)
  async handleProductEvents(@Payload() message) {
    switch (message.type) {
      case KAFKA_PRODUCT_TYPES.GET_LIST:
        return await this.getProductCatalog.run();
      case KAFKA_PRODUCT_TYPES.GET_PRODUCT:
        return await this.getProduct.run(message.data.id);
      case KAFKA_PRODUCT_TYPES.CREATE_PRODUCT:
        return await this.createProduct.run(message.data);
      case KAFKA_PRODUCT_TYPES.UPDATE_PRODUCT:
        return await this.updateProduct.run(message.data);
      case KAFKA_PRODUCT_TYPES.REMOVE_PRODUCT:
        return await this.removeProduct.run(message.data.id);
    }
  }

  /**
   * Handles incoming messages for order-related events.
   * @param message The message payload containing the order event data.
   */
  @EventPattern(KAFKA_TOPICS.ORDER_EVENTS)
  async handleOrderEvents(@Payload() message) {
    switch (message.type) {
      case KAFKA_ORDER_TYPES.ORDER_CREATED:
        return await this.updateProduct.run(message.data);
    }
  }

  /**
   * Subscribes to necessary Kafka topics upon module initialization.
   */
  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.ORDER_EVENTS);
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.PRODUCT_MESSAGES);
  }
}
