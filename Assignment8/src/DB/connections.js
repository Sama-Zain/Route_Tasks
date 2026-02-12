import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "Assignment8";
export const connectdb = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
};
 export const db = await connectdb();