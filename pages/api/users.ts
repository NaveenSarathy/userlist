import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

// const client = new MongoClient("MONGO_DB_CONNECTION_STRING");
const client = new MongoClient(process.env.MONGO_URI as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.connect();
  const db = client.db("nestjs-users");
  const collection = db.collection("users");

  if (req.method === "POST") {
    console.log("came  post");
    const { email, name } = req.body;
    await collection.insertOne({ email, name });
    return res.status(201).send("User added");
  }

  if (req.method === "GET") {
    const { email } = req.query;
    const users = await collection.find({ email }).toArray();
    return res.status(200).json(users);
  }

  res.status(405).send("Method not allowed");
}
