import { dbConnection } from "../../../../utils/dbConnection";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnection();
    switch (method) {
      case "GET":
        try {
          const users = await User.find({});
          res.status(200).json({ success: true, data: users });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case "POST":
        try {
          const body = req.body;
          const users = await User.create(body);
          res.status(201).json({ success: true, data: users });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      default:
        res.setHeaders("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed!`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
