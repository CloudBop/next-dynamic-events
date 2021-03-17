import {
  insertDocument,
  connectDatabase,
  getAllDocuments
} from "../../../helpers/db-utility";

async function handler(req, res) {
  // get url query
  const eventId = req.query.eventId;
  //
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(`connectDatabase()-failed`);
    console.log(error);
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }
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

      client.close();
      return undefined;
    }

    const newComment = {
      name,
      email,
      text,
      eventId
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      // console.log(result);
      res.status(201).json({ message: "Comment Added", comment: newComment });
    } catch (error) {
      console.log(`insertDocument()-failed`);
      console.log(error);
      res
        .status(500)
        .json({ message: "Inserting comment into the database failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const result = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments: result });
    } catch (error) {
      console.log(`insertDocument()-failed`);
      console.log(error);
      res.status(500).json({ message: "getting comment data from db failed" });
    }
  }

  client.close();
}

export default handler;
