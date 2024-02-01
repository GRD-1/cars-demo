import { Schema } from 'mongoose';

export interface ModelDataType<T extends Schema> {
  name: string,
  schema: T
}
