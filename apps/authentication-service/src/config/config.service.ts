import { Config } from './config';

/**
 * Service class to manage the config properties for the mktp-api
 *
 * @see ConfigService
 */
export class ConfigService {
  private config: Config;

  static instance: ConfigService;

  static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService();
    }
    return this.instance;
  }

  constructor() {
    this.config = new Config({
      dbType: process.env.DB_TYPE,
      dbHost: process.env.DB_HOST,
      dbPort: process.env.DB_PORT,
      dbUserName: process.env.DB_USERNAME,
      dbPassword: process.env.DB_PASSWORD,
      dbDatabase: process.env.DB_DATABASE,
      clientId: process.env.KAFKA_CLIENTID,
      brokers: process.env.KAFKA_BROKERS,
      groupId: process.env.KAFKA_GROUPID,
      saltRounds: process.env.BCRYPT_SALT,
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRESIN,
    });
  }

  getConfig(): Config {
    return this.config;
  }
}
