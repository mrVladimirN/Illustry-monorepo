import mongoose, { ConnectOptions, Connection } from 'mongoose';
import { BZLInstance } from './bzl';
import { DbaccInstance } from './dbacc/lib';

require('dotenv').config();

export class Factory {
  private static _instance: Factory;

  private static _dbaccInstance: DbaccInstance;

  private static _bzlInstance: BZLInstance;

  constructor() {
    if (Factory._instance) {
      throw new Error('Use Factory getInstance() instead');
    }
    const dbConnection = mongoose.createConnection(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URL
          ? process.env.MONGO_TEST_URL
          : ''
        : process.env.MONGO_URL
          ? process.env.MONGO_URL
          : ''
      // connectionOptions
    );
    Factory._dbaccInstance = new DbaccInstance(dbConnection);
    Factory._bzlInstance = new BZLInstance(Factory._dbaccInstance);
    Factory._instance = this;
  }

  static getInstance(): Factory {
    return Factory._instance || new Factory();
  }

  getDbaccInstance(): DbaccInstance {
    return Factory._dbaccInstance;
  }

  getBZL(): BZLInstance {
    return Factory._bzlInstance;
  }
}
