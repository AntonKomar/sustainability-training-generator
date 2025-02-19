import express from "express";
import { generateTrainingOutline } from "../services/aiService";
import * as dbService from "../services/databaseService";

const router = express.Router();

router.post("/training", async (req, res) => {
  try {
    const { companyName, industry, goals, context } = req.body;

    const outline = await generateTrainingOutline({
      companyName,
      industry,
      goals,
      context,
    });

    const training = await dbService.saveTraining(
      { companyName, industry, goals, context },
      outline
    );

    res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    console.error("Error generating training:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate training outline",
    });
  }
});

router.get("/training", async (req, res) => {
  try {
    const trainings = await dbService.getTrainings();
    res.json({
      success: true,
      data: trainings,
    });
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trainings",
    });
  }
});

router.get("/training/:id", async (req, res) => {
  try {
    const training = await dbService.getTrainingById(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        error: "Training not found",
      });
    }

    res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    console.error("Error fetching training:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch training",
    });
  }
});

export default router;
