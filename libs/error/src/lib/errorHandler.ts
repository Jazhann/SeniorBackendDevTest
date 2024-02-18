import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Logger } from '@nestjs/common';

export class ErrorHandler {
  static handleError(errorMsg: string, errorStatus: HttpStatus, errorTrace?: string) {
    Logger.error(errorMsg, errorTrace, 'CustomErrorHandler');
    switch (errorStatus) {
      case HttpStatus.BAD_REQUEST:
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: errorMsg,
          error: 'The request could not be understood by the server due to malformed syntax.',
        });
      case HttpStatus.UNAUTHORIZED:
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: errorMsg,
          error:
            'The request requires user authentication or, if the request included authentication credentials, authorization has been refused for those credentials.',
        });
      case HttpStatus.FORBIDDEN:
        throw new RpcException({
          status: HttpStatus.FORBIDDEN,
          message: errorMsg,
          error:
            'You do not have permission to access the requested resource. Please contact the administrator if you believe this is an error.',
        });
      case HttpStatus.NOT_FOUND:
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: errorMsg,
          error:
            'The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.',
        });
      case HttpStatus.INTERNAL_SERVER_ERROR:
      default:
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errorMsg,
          error: 'The server encountered an unexpected condition which prevented it from fulfilling the request.',
        });
    }
  }
}
