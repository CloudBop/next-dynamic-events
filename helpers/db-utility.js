import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-events?retryWrites=true&w=majority`
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  // open db connection
  const db = client.db();
  // insert document into collection
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(
  client,
  collection,
  sort = { _id: -1 },
  filter = {}
) {
  //
  const db = client.db();
  const documents = await db
    .collection(collection)
    //
    .find(filter)
    //
    .sort(sort)
    .toArray();

  return documents;
}
