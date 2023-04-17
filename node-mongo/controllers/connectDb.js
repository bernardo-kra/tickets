const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connectToDatabase = async (dbName, collectionName) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  return { client, collection };
};

module.exports = { connectToDatabase };
