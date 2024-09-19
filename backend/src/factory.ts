/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
import BZLInstance from './bzl';
import DbaccInstance from './dbacc/lib';
import 'dotenv/config';

export default class Factory {
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
          : '',
      {
        dbName: process.env.NODE_ENV === 'test' ? 'illustrytest' : 'illustry',
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD
      }
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
