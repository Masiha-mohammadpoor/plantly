import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedMongoose = global.mongoose;

if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cachedMongoose.conn) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedMongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cachedMongoose.conn = await cachedMongoose.promise;
    console.log('Connected to MongoDB with Mongoose');
    return cachedMongoose.conn;
  } catch (e) {
    cachedMongoose.promise = null;
    throw e;
  }
}

let cachedMongoClient = global.mongoClient;

if (!cachedMongoClient) {
  cachedMongoClient = global.mongoClient = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cachedMongoClient.conn) {
    return cachedMongoClient.conn;
  }

  if (!cachedMongoClient.promise) {
    const options = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    };

    cachedMongoClient.promise = new MongoClient(MONGODB_URI, options).connect();
  }

  try {
    cachedMongoClient.conn = await cachedMongoClient.promise;
    console.log('Connected to MongoDB with Native Driver');
    return cachedMongoClient.conn;
  } catch (e) {
    cachedMongoClient.promise = null;
    throw e;
  }
}

export { connectDB, connectMongoDB };