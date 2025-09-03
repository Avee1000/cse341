require('dotenv').config();
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function run() {

  if (db) return db;

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db = client.db("sample_airbnb");
    console.log(`✅ [DB] Connected to MongoDB database: sample_airbnb`);
    return db;
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
}

// run().catch(console.dir);
module.exports = {
  run
};
