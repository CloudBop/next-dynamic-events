import { MongoClient } from "mongodb";
async function handler(req, res) {
  // get url query
  const eventId = req.query.eventId;
  //
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongouser}:${process.env.mongopw}@cluster0.61wo8.mongodb.net/nextjs-events-comments?retryWrites=true&w=majority`
  );
  //
  if (req.method === "POST") {
    // server validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return undefined;
    }

    const newComment = {
      name,
      email,
      text,
      eventId
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.id;
    // console.log(result);
    res.status(201).json({ message: "Comment Added", comment: newComment });
  }

  if (req.method === "GET") {
    const dummy = [
      { id: 1, name: "colin", text: "something text" },
      { id: 2, name: "colin", text: "another comment by me" }
    ];

    res.status(200).json({ comments: dummy });
  }

  client.close();
}

export default handler;
