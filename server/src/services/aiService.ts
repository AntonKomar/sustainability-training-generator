import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  SafetySetting,
} from "@google/generative-ai";
import config from "../config/config";

const genAI = new GoogleGenerativeAI(config.geminiAiKey);

export interface TrainingInput {
  companyName: string;
  industry: string;
  goals: string;
  context?: string;
}

export async function generateTrainingOutline(
  input: TrainingInput
): Promise<string> {
  try {
    const generationConfig = {
      temperature: 0.4, // Lower for more consistent/focused responses
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 4096,
    };

    const safetySettings: SafetySetting[] = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
      safetySettings,
    });

    const systemInstruction = `
          You are an expert sustainability consultant who creates professional, 
          structured training outlines. Your responses should be comprehensive 
          yet concise, focused on actionable insights, and tailored to the 
          specific industry context.`;

    let prompt = `
          ${systemInstruction}
          
          SUSTAINABILITY TRAINING OUTLINE CREATION TASK

          COMPANY INFORMATION:
          - Name: ${input.companyName}
          - Industry: ${input.industry}
          - Sustainability Goals: ${input.goals}
          - Additional Context: ${input.context || "N/A"}

          OUTPUT REQUIREMENTS:
          Create a detailed, professional sustainability training outline specifically tailored for this company. 
          The outline must:
          - Be practical and actionable
          - Include industry-specific terminology and best practices
          - Align with current sustainability frameworks (GRI, SASB, TCFD as relevant)
          - Consider both environmental and social sustainability aspects
          - Be structured for a 4-hour training session
          - Include interactive elements and exercises
          - Provide clear guidance for implementation

          FORMAT: 
          - Use bullet points for clarity
          - Include timeframes for each section
          - Highlight key concepts in bold
          - Include 2-3 interactive elements or exercises per section`;

    const evaluationSection = `
          EVALUATION CRITERIA:
          Before finalizing your response, verify that your outline meets these criteria:
          1. Specificity: Is the outline tailored to the specific industry and company?
          2. Practicality: Are the suggested actions implementable?
          3. Comprehensiveness: Are all key sustainability dimensions covered?
          4. Balance: Does it address both quick wins and long-term transformation?
          5. Clarity: Is the language clear and accessible to non-experts?`;

    const outputFormatting = `
          FORMAT YOUR RESPONSE USING MARKDOWN:
          - Use ## for section headings
          - Use ### for subsections
          - Use bullet points (*) for lists
          - Use bold (**text**) for emphasis
          - Use tables where appropriate for comparing options`;

    const industryContext = getIndustryContext(input.industry);

    prompt += `\nINDUSTRY-SPECIFIC CONSIDERATIONS:
               \n${industryContext}
               \n${evaluationSection}
               \n${outputFormatting}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw new Error("Failed to generate training outline with AI service");
  }
}

const industryContexts = {
  Technology:
    "Consider digital carbon footprint, e-waste management, ethical AI, and data center efficiency.",
  Manufacturing:
    "Focus on circular economy principles, supply chain emissions, material efficiency, and clean production processes.",
  Healthcare:
    "Address medical waste management, pharmaceutical pollution, energy-intensive equipment, and social responsibility in care.",
  Retail:
    "Emphasize sustainable sourcing, packaging reduction, logistics optimization, and consumer education.",
  Energy:
    "Concentrate on renewable transition, carbon capture, community impact, and just transition principles.",
};

function getIndustryContext(industry: string): string {
  return (
    industryContexts[industry as keyof typeof industryContexts] ||
    "Ensure industry-specific sustainability challenges and opportunities are identified."
  );
}
