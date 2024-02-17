import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { ProductCatalogIRepository } from '../../domain/productCatalog.i.repository';
import { Product } from '@ecommerce/models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { ErrorHandler } from '@ecommerce/error';

export class ProductCatalogRepository implements ProductCatalogIRepository {
  constructor(
    @Inject(`KAFKA_CLIENT`) private readonly kafkaClient: ClientKafka,
    @InjectRepository(Product) private productsRepository: Repository<Product>
  ) {}

  /**
   * Retrieves a single product by its ID.
   * @param id The ID of the product to retrieve.
   * @returns The product.
   * @throws NotFoundException if the product is not found.
   */
  async getProduct(id: string): Promise<string> {
    Logger.log(`Getting product id: ${id}`);
    try {
      const product = await this.productsRepository.findOneBy({ id: +id });
      if (product) {
        return JSON.stringify(product);
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.getProduct()');
    }
  }

  /**
   * Retrieves the full product catalog.
   * @returns The product catalog.
   */
  async getProductCatalog(): Promise<Product[]> {
    Logger.log(`Getting product catalog`);
    try {
      const products = await this.productsRepository.find();
      return products;
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.getProductCatalog()');
    }
  }

  /**
   * Creates a new product in the catalog.
   * @param product The product to create.
   * @returns The created product.
   */
  async createProduct(product: Product): Promise<string> {
    Logger.log(`Creating product: ${JSON.stringify(product)}`);
    try {
      const response = await this.productsRepository.save(product);
      return JSON.stringify(response);
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.createProduct()');
    }
  }

  /**
   * Updates an existing product.
   * @param product The product with updated information.
   * @returns An object with the result.
   * @throws NotFoundException if the update operation affects no rows.
   */
  async updateProduct(product: Product): Promise<{ result: string }> {
    Logger.log(`Updating product: ${JSON.stringify(product)}`);
    try {
      const result = await this.productsRepository.update(product.id, product);
      if (result.affected > 0) {
        const message = JSON.stringify({
          type: 'product-updated',
          data: product,
        });
        this.kafkaClient.emit('product-events', message);
        return { result: 'ok' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.updateProduct()');
    }
  }

  /**
   * Updates an existing product after created order.
   * @param product The product with updated information.
   * @returns An object with the result.
   * @throws NotFoundException if the update operation affects no rows.
   */
  async updateProductAmount(product: Product): Promise<{ result: string }> {
    Logger.log(`Updating product amount: ${JSON.stringify(product)}`);
    try {
      const result = await this.productsRepository.decrement({ id: product.id }, 'amount', product.amount);
      if (result.affected > 0) {
        const message = JSON.stringify({
          type: 'product-updated',
          data: product,
        });
        this.kafkaClient.emit('product-events', message);
        return { result: 'ok' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.updateProductAmount()');
    }
  }

  /**
   * Removes a product from the catalog.
   * @param id The ID of the product to remove.
   * @returns An object with the result.
   * @throws NotFoundException if the removal operation affects no rows.
   */
  async removeProduct(id: string): Promise<{ result: string }> {
    Logger.log(`Removing product id: ${id}`);
    try {
      const result = await this.productsRepository.delete(id);
      if (result.affected > 0) {
        return { result: 'ok' };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      ErrorHandler.handleError(error.message, error.status, 'ProductCatalogRepository.removeProduct()');
    }
  }
}
