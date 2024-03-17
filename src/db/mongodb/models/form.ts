import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const FormModel =
  mongoose.models.Form || mongoose.model("Form", FormSchema);
