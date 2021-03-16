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
    res.status(201).json({ message: "email verified" });
  }
}

export default handler;
