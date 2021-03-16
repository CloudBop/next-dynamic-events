function handler(req, res) {
  // get url query
  const eventId = req.query.eventId;
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
      id: new Date().toISOString(),
      name,
      email,
      text
    };
    console.log(`newComment`, newComment);
    res.status(201).json({ message: "Comment Added", comment: newComment });
  }

  if (req.method === "GET") {
    const dummy = [
      { id: 1, name: "colin", text: "something text" },
      { id: 2, name: "colin", text: "another comment by me" }
    ];

    res.status(200).json({ comments: dummy });
  }
}

export default handler;
