export class Config {
  dbType:
    | 'mysql'
    | 'mariadb'
    | 'postgres'
    | 'cockroachdb'
    | 'sqlite'
    | 'cordova'
    | 'nativescript'
    | 'react-native'
    | 'expo'
    | 'oracle'
    | 'mssql'
    | 'mongodb'
    | 'sap'
    | 'spanner';
  dbHost: string;
  dbPort: number;
  dbUserName: string;
  dbPassword: string;
  dbDatabase: string;
  clientId: string;
  brokers: string[];
  groupId: string;
  constructor(config) {
    this.dbType = config.dbType;
    this.dbHost = config.dbHost;
    this.dbPort = +config.dbPort;
    this.dbUserName = config.dbUserName;
    this.dbPassword = config.dbPassword;
    this.dbDatabase = config.dbDatabase;
    this.clientId = config.clientId;
    this.brokers = config.brokers.split(',');
    this.groupId = config.groupId;
  }
}
