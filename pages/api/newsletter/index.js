import { MongoClient } from "mongodb";

async function connectDatabse() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-events-newsletter?retryWrites=true&w=majority`
  );
  return client;
}

async function insertDocument(client, document) {
  // open db connection
  const db = client.db();
  // insert document into collection
  await db.collection("emails").insertOne(document);
}

async function handler(req, res) {
  //
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // dont rely on frontend validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    let client;
    try {
      client = await connectDatabse();
    } catch (error) {
      console.log(`connectDatabase()-failed`);
      console.log(error);
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      console.log(`insertDocument()-failed`);
      console.log(error);
      res
        .status(500)
        .json({ message: "Inserting data into the database failed" });
      return;
    }
    //

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
