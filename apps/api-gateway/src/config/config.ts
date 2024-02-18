export class Config {
  port: number;
  clientId: string;
  brokers: string[];
  groupId: string;
  constructor(config) {
    this.port = +config.port;
    this.clientId = config.clientId;
    this.brokers = config.brokers.split(',');
    this.groupId = config.groupId;
  }
}
