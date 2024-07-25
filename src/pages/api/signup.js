import bcrypt from "bcrypt";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, name, surname } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
        surname,
      });
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
