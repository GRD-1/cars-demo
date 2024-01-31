import * as mongoose from 'mongoose';
import * as process from 'process';
import { CustomError } from '../errors/custom-error.type';
import { UNABLE_CONNECT_DB } from '../constants/err.constant';

const host = process.env.MONGO_HOSTNAME;
const port = process.env.MONGO_PORT_INTERNAL;
const db = process.env.MONGO_INITDB_DATABASE;
const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const connectionString = `mongodb://${user}:${password}@${host}:${port}/${db}`;

class MongoConnector {
  private _connection: any;

  async connect (): Promise<void> {
    try {
      this._connection = await mongoose.connect(connectionString, {});
    } catch (error) {
      throw new CustomError(503, UNABLE_CONNECT_DB);
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await this._connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      throw new CustomError(500, 'Error closing MongoDB connection');
    }
  }
}
export default new MongoConnector();
