import { ProductCatalogIRepository } from '../domain/productCatalog.i.repository';

export class GetProduct {
  constructor(private productCatalogRepository: ProductCatalogIRepository) {}
  async run(id: string): Promise<string> {
    return await this.productCatalogRepository.getProduct(id);
  }
}
