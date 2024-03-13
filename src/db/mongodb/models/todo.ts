import mongoose from "mongoose";
import UserModel from "@/db/mongodb/models/user";

let TodoSchema = new mongoose.Schema({
  todo: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },
  isCompleted: Boolean,
  createdAt: String,
  updatedAt: String,
});

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
