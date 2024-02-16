export class Config {
  clientId: string;
  brokers: string[];
  groupId: string;
  constructor(config) {
    this.clientId = config.clientId;
    this.brokers = config.brokers.split(',');
    this.groupId = config.groupId;
  }
}
