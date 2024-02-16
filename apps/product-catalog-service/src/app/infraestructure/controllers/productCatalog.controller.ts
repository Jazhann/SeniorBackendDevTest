import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';

import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { GetProductCatalog } from '../../aplication/getProductCatalog.service';
import { CreateProduct } from '../../aplication/createProduct.service';
import { RemoveProduct } from '../../aplication/removeProduct.service';
import { GetProduct } from '../../aplication/getProduct.service';
import { UpdateProduct } from '../../aplication/updateProduct.service';

@Controller('')
export class ProductCatalogController implements OnModuleInit {
  constructor(
    @Inject(`KAFKA_CLIENT`) private readonly kafkaClient: ClientKafka,
    @Inject(GetProductCatalog) private getProductCatalog: GetProductCatalog,
    @Inject(GetProduct) private getProduct: GetProduct,
    @Inject(CreateProduct) private createProduct: CreateProduct,
    @Inject(UpdateProduct) private updateProduct: UpdateProduct,
    @Inject(RemoveProduct) private removeProduct: RemoveProduct
  ) {}

  /**
   * Handles incoming messages for product-related events.
   * @param message The message payload containing the product event data.
   * @returns The result of the product operation based on the event type.
   */
  @MessagePattern('product-events')
  async handleProductEvents(@Payload() message) {
    Logger.log('Message', { message });
    switch (message.type) {
      case 'get-list':
        return await this.getProductCatalog.run();
      case 'get-product':
        return await this.getProduct.run(message.data.id);
      case 'create-product':
        return await this.createProduct.run(message.data);
      case 'update-product':
        return await this.updateProduct.run(message.data);
      case 'remove-product':
        return await this.removeProduct.run(message.data.id);
    }
  }

  @EventPattern('order-events')
  async handleOrderEvents(@Payload() message) {
    Logger.log('Message', { message });
    switch (message.type) {
      case 'order-created':
        return await this.updateProduct.run(message.data);
    }
  }

  /**
   * Subscribes to necessary Kafka topics upon module initialization.
   */
  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(`order-events`);
    this.kafkaClient.subscribeToResponseOf(`product-events`);
  }
}
