import { Schema, Document, Connection, createConnection } from 'mongoose';
import * as process from 'process';
import { CustomError } from '../types/custom-error.type';
import { UNABLE_CONNECT_DB } from '../constants/err.constant';
import { ModelDataType } from '../types/model-data.type';

const host = process.env.MONGO_HOSTNAME;
const port = process.env.MONGO_PORT_INTERNAL;
const db = process.env.MONGO_INITDB_DATABASE;
const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const connectionString = `mongodb://${user}:${password}@${host}:${port}/${db}`;

export default class MongoConnector {
  async getConnection<T extends Schema, D extends Document>(modelData: ModelDataType<T>[]): Promise<Connection> {
    try {
      const connection = await createConnection(connectionString, {});
      modelData.forEach((item => connection.model<D>(item.name, item.schema)));
      return connection;
    } catch (error) {
      throw new CustomError(503, UNABLE_CONNECT_DB);
    }
  }
}
