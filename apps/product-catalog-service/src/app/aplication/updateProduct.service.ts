import { Order, Product } from '@ecommerce/models';
import { ProductCatalogIRepository } from '../domain/productCatalog.i.repository';

export class UpdateProduct {
  constructor(private productCatalogRepository: ProductCatalogIRepository) {}
  async run(param: Product | Order): Promise<{ result: string }> {
    let instance;
    if ('products' in param) {
      instance = new Order();
      Object.assign(instance, param);
      instance.products = instance.products.map((product) => {
        const prodInstance = new Product();
        Object.assign(prodInstance, product);
        return prodInstance;
      });
    } else {
      instance = new Product();
      Object.assign(instance, param);
    }
    if (instance instanceof Order) {
      for (const product of instance.products) {
        product.amount--;
        this.productCatalogRepository.updateProductAmount(product);
      }
    } else {
      return await this.productCatalogRepository.updateProduct(instance);
    }
  }
}
