import { MongoClient } from "mongodb";

async function handler(req, res) {
  //
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // dont rely on frontend validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    console.log(userEmail);

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-events-newsletter?retryWrites=true&w=majority`
    );
    // open db connection
    const db = client.db();
    // insert document into collection
    await db.collection("emails").insertOne({ email: userEmail });
    //
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
