// server/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Schema
const TrainingSchema = new mongoose.Schema({
  companyName: String,
  industry: String,
  goals: String,
  context: String,
  outline: String,
  createdAt: { type: Date, default: Date.now }
});

const Training = mongoose.model('Training', TrainingSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainability')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Generate training outline
const generateTrainingOutline = async (input: any) => {
  const prompt = `
    Create a detailed sustainability training outline for a company with the following details:
    Company: ${input.companyName}
    Industry: ${input.industry}
    Sustainability Goals: ${input.goals}
    Additional Context: ${input.context}

    Please structure the training outline with:
    1. Introduction
    2. Industry-Specific Sustainability Challenges
    3. Company Goals and Objectives
    4. Training Modules (4-5 key areas)
    5. Implementation Steps
    6. Success Metrics
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

// API Endpoints
app.post('/api/generate', async (req, res) => {
  try {
    const outline = await generateTrainingOutline(req.body);
    
    // Save to database
    const training = new Training({
      ...req.body,
      outline
    });
    await training.save();

    res.json({ outline });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate training outline' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});