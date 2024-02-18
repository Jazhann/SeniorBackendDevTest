import { HttpException, HttpStatus, Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginModel, OrderModel, ProductModel, UserModel } from '@ecommerce/models';
import { ApiGatewayIRepository } from '../../domain/apiGateway.i.repository';
import {
  KAFKA_CLIENT,
  KAFKA_ORDER_TYPES,
  KAFKA_PRODUCT_TYPES,
  KAFKA_USER_TYPES,
  KAFKA_TOPICS,
} from '@ecommerce/constants';

/**
 * Repository class for API Gateway with Kafka communication.
 */
export class ApiGatewayKafkaRepository implements ApiGatewayIRepository, OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka) {}

  /**
   * Fetches the product catalog.
   * @returns A promise that resolves to an array of ProductModels.
   */
  async getProductCatalog(): Promise<ProductModel[]> {
    Logger.log('Getting product catalog');
    const message = JSON.stringify({ type: KAFKA_PRODUCT_TYPES.GET_LIST, data: undefined });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.PRODUCT_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Fetches a single product by ID.
   * @param id The ID of the product to fetch.
   * @returns A promise that resolves to a ProductModel.
   */
  async getProduct(id: string): Promise<ProductModel> {
    Logger.log(`Getting product with id`);
    const message = JSON.stringify({ type: KAFKA_PRODUCT_TYPES.GET_PRODUCT, data: id });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.PRODUCT_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Creates a new product.
   * @param product The product to create.
   * @returns A promise that resolves to the created ProductModel.
   */
  async createProduct(product: ProductModel): Promise<ProductModel> {
    Logger.log(`Creating product`);
    const message = JSON.stringify({ type: KAFKA_PRODUCT_TYPES.CREATE_PRODUCT, data: product });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.PRODUCT_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Updates an existing product.
   * @param product The product to update.
   * @returns A promise that resolves to an object indicating the result of the update operation.
   */
  async updateProduct(product: ProductModel): Promise<{ result: string }> {
    Logger.log(`Updating product`);
    const message = JSON.stringify({ type: KAFKA_PRODUCT_TYPES.UPDATE_PRODUCT, data: product });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.PRODUCT_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Removes a product by ID.
   * @param id The ID of the product to remove.
   * @returns A promise that resolves to an object indicating the result of the removal operation.
   */
  async removeProduct(id: string): Promise<{ result: string }> {
    Logger.log(`Removing product id`);
    const message = JSON.stringify({ type: KAFKA_PRODUCT_TYPES.REMOVE_PRODUCT, data: id });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.PRODUCT_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Creates a new user.
   * @param user The user model to create.
   * @returns A promise that resolves to the created UserModel, omitting the password.
   */
  async createUser(user: UserModel): Promise<Omit<UserModel, 'password'>> {
    Logger.log(`Creating user`);
    const message = JSON.stringify({ type: KAFKA_USER_TYPES.CREATE_USER, data: user });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.USER_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Authenticates a user.
   * @param login The login model containing authentication details.
   * @returns A promise that resolves to an object containing the authentication token.
   */
  async authenticate(login: LoginModel): Promise<{ token: string }> {
    Logger.log(`Authenticating`);
    const message = JSON.stringify({ type: KAFKA_USER_TYPES.LOGIN, data: login });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.USER_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Creates a new order.
   * @param order The order model to create.
   * @returns A promise that resolves to the created OrderModel.
   */
  async createOrder(order: OrderModel): Promise<OrderModel> {
    Logger.log(`Creating order`);
    const message = JSON.stringify({ type: KAFKA_ORDER_TYPES.CREATE_ORDER, data: order });
    try {
      return await lastValueFrom(this.kafkaClient.send(KAFKA_TOPICS.ORDER_MESSAGES, message));
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error) {
    throw new HttpException(
      {
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal Server Error',
        error: error.error || null,
      },
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  /**
   * Initializes subscriptions to Kafka topics on module initialization.
   */
  onModuleInit() {
    // Subscribes to Kafka topics for product, user, and order messages.
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.PRODUCT_MESSAGES);
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.USER_MESSAGES);
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.ORDER_MESSAGES);
  }
}
