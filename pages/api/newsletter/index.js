import { insertDocument, connectDatabase } from "../../../helpers/db-utility";

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
      client = await connectDatabase();
    } catch (error) {
      console.log(`connectDatabase()-failed`);
      console.log(error);
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter-emails", { email: userEmail });
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
