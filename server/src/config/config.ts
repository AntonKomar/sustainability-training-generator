import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 4001,
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability",
  geminiAiKey: process.env.GEMINI_API_KEY || "",
  environment: process.env.NODE_ENV || "development",
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || [
    "http://localhost:4000",
  ],
};
