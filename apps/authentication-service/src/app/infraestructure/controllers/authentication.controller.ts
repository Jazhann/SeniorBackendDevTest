import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Authenticate } from '../../aplication/authenticate.service';
import { CreateUser } from '../../aplication/createUser.service';
import { VerifyToken } from '../../aplication/verifyToken.service';
import { KAFKA_CLIENT, KAFKA_TOPICS, KAFKA_USER_TYPES } from '@ecommerce/constants';
@Controller()
export class AuthenticationController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
    @Inject(Authenticate) private authenticate: Authenticate,
    @Inject(CreateUser) private createUser: CreateUser,
    @Inject(VerifyToken) private verifyToken: VerifyToken
  ) {}

  /**
   * Handles incoming Kafka messages on the 'user-events' topic.
   * @param message The payload of the message.
   */
  @MessagePattern(KAFKA_TOPICS.USER_MESSAGES)
  handleAuthenticate(@Payload() message) {
    switch (message.type) {
      case KAFKA_USER_TYPES.LOGIN:
        return this.authenticate.run(message.data);
      case KAFKA_USER_TYPES.CREATE_USER:
        return this.createUser.run(message.data);
      case KAFKA_USER_TYPES.VERIFY:
        return this.verifyToken.run(message.data);
    }
  }

  /**
   * Subscribes to Kafka topics once the module is initialized.
   */
  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPICS.USER_MESSAGES);
  }
}
