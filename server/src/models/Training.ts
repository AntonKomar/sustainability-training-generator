import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  },
  context: {
    type: String,
  },
  outline: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Training = mongoose.model("Training", trainingSchema);
