import { OrderIRepository } from '../domain/order.i.repository';
import { Order, Product } from '@ecommerce/models';

export class UpdateOrder {
  constructor(private orderRepository: OrderIRepository) {}
  async run(param?: Product | Order): Promise<void> {
    if (param instanceof Order) {
      for (const product of param.products) {
        product.value--;
        this.orderRepository.updateOrder(product);
      }
    } else {
      return await this.orderRepository.updateOrder(param);
    }
  }
}
