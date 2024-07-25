import { dbConnection } from "../../../../utils/dbConnection";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await dbConnection();
    switch (method) {
      case "GET":
        try {
          const user = await User.findById(id);
          if (!user) {
            return res
              .status(404)
              .json({ success: false, error: "User not found!" });
          }
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case "PUT":
        try {
          const body = req.body;
          const user = await User.findByIdAndUpdate(id, body);
          if (!user) {
            return res
              .status(404)
              .json({ success: false, error: "User not found!" });
          }
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case "DELETE":
        try {
          const user = await User.findByIdAndDelete(id);
          if (!user) {
            return res
              .status(404)
              .json({ success: false, error: "TUser not found!" });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      default:
        res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} not allowed!`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
