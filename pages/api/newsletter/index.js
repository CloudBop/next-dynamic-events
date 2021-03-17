import { MongoClient } from "mongodb";

function handler(req, res) {
  //
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // dont rely on frontend validation
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    console.log(userEmail);

    MongoClient.connect(
      `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-events-newsletter?retryWrites=true&w=majority`
    ).then(client => {
      const db = client.db;

      // insert document into collection
      return db.collection("emails").insertOne({ email: userEmail });
    });
    res.status(201).json({ message: "email verified" });
  }
}

export default handler;
