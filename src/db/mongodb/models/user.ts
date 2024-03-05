import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
  createdAt: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
