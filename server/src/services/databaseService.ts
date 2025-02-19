import mongoose from "mongoose";
import config from "../config/config";
import { Training } from "../models/Training";
import { TrainingInput } from "./aiService";

// Initialize database connection
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function saveTraining(input: TrainingInput, outline: string) {
  const training = new Training({
    ...input,
    outline,
  });
  return await training.save();
}

export async function getTrainings() {
  return await Training.find().sort({ createdAt: -1 });
}

export async function getTrainingById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Training.findById(id);
}

export async function getTrainingsWithPagination(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [trainings, total] = await Promise.all([
    Training.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Training.countDocuments(),
  ]);

  return {
    trainings,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNext: skip + limit < total,
      hasPrev: page > 1,
    },
  };
}
