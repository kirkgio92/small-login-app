import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "kirkgio92",
    required: true,
  },
  password: {
    type: String,
    default: "No password provided",
    required: true,
  },
  name: {
    type: String,
    default: "No name provided",
    required: true,
  },
  surname: {
    type: String,
    default: "No surname provided",
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
