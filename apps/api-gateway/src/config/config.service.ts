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
      port: process.env.PORT,
      clientId: process.env.KAFKA_CLIENTID,
      brokers: process.env.KAFKA_BROKERS,
      groupId: process.env.KAFKA_GROUPID,
    });
  }

  getConfig(): Config {
    return this.config;
  }
}
