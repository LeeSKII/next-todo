import mongoose from "mongoose";

let TodoSchema = new mongoose.Schema({
  todo: String,
  belong: String,
  isCompleted: Boolean,
  createdAt: String,
  updatedAt: String,
});

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
