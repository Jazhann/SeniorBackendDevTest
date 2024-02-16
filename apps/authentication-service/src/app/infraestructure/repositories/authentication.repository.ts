import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthenticationIRepository } from '../../domain/authentication.i.repository';
import { ClientKafka } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login, User } from '@ecommerce/models';
import * as bcrypt from 'bcryptjs';
import { ErrorHandler } from '@ecommerce/error';
import config from '../../../config';

export class AuthenticationRepository implements AuthenticationIRepository {
  constructor(
    @Inject(`KAFKA_CLIENT`) private readonly kafkaClient: ClientKafka,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Creates a new user with hashed password.
   * @param user The user object to create.
   * @returns The created user object without the password.
   */
  async createUser(user: User): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(user.password, config.saltRounds);
    const userHashed = { ...user, password: hashedPassword };
    try {
      const result = await this.userRepository.save(userHashed);
      delete result.password;
      return result;
    } catch (error) {
      ErrorHandler.handleError(error.message, error.errorCode, 'AuthenticationRepository.createUser()');
    }
  }

  /**
   * Authenticates a user by their login credentials.
   * @param login The login credentials.
   * @returns An object containing the JWT token if authentication is successful.
   * @throws UnauthorizedException If authentication fails.
   */
  async authenticate(login: Login): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.findOneBy({ email: login.email });
      if (user && (await bcrypt.compare(login.password, user.password))) {
        const { password, ...payload } = user;
        this.kafkaClient.emit('user-events', JSON.stringify({ type: 'user-loged', data: user }));
        return { token: await this.jwtService.signAsync(payload) };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      ErrorHandler.handleError(error.message, error.errorCode, 'AuthenticationRepository.authenticate()');
    }
  }

  /**
   * Verifies the given JWT token and returns the associated user without the password.
   * @param token The JWT token to verify.
   * @returns The user object associated with the token, without the password.
   */
  async verifyToken(token: string): Promise<Omit<User, 'password'>> {
    return await this.jwtService.verifyAsync(token, { secret: config.jwtSecret });
  }
}
