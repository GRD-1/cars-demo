import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'test',
});

class MongoConnector {
  async connect (): Promise<void> {
    try {
      const connectionString = `mongodb://${process.env.MONGO_HOSTNAME_INTERNAL}:${process.env.MONGO_PORT_EXTERNAL}/${process.env.MONGO_INITDB_DATABASE}`;
      console.log('\nconnectionString', connectionString);
      // await mongoose.connect(connectionString, {});
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async close (): Promise<void> {
    // await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}
export default new MongoConnector();
