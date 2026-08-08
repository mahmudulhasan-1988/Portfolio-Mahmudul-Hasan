import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://protfolio-web-db:PZ89NPsQOj2O4fLj@ac-rhbubgd-shard-00-00.cyvta3n.mongodb.net:27017,ac-rhbubgd-shard-00-01.cyvta3n.mongodb.net:27017,ac-rhbubgd-shard-00-02.cyvta3n.mongodb.net:27017/?ssl=true&replicaSet=atlas-fquzjk-shard-0&authSource=admin&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'portfolio_db';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, { tls: true });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, { tls: true });
  clientPromise = client.connect();
}

export async function getDb() {
  const conn = await clientPromise;
  return conn.db(DB_NAME);
}
