import cors from "cors";
import express from "express";
import config from "./config/config";
import trainingRoutes from "./routes/api";
import { connectDatabase } from "./services/databaseService";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Connect to Database
connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

// Routes
app.use("/api", trainingRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: config.environment,
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
});

export default app;
