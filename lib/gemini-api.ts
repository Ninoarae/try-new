import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY!);

export async function generateBusinessModels(userInput: {
  interests: string;
  skills: string;
  budget: string;
  introduction: string;
}): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Based on the following user input, suggest three suitable business models:
      Interests: ${userInput.interests}
      Skills: ${userInput.skills}
      Budget: ${userInput.budget}
      Introduction: ${userInput.introduction}

      Please provide the names of three business models that best match the user's profile.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text.split('\n').filter(model => model.trim() !== '');
  } catch (error) {
    console.error("Error generating business models:", error);
    throw new Error("Failed to generate business models. Please try again.");
  }
}

export async function generateSuccessPlan(businessModel: string, userInput: {
  interests: string;
  skills: string;
  budget: string;
  introduction: string;
}): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a detailed success plan for the following business model:
      ${businessModel}

      User Profile:
      Interests: ${userInput.interests}
      Skills: ${userInput.skills}
      Budget: ${userInput.budget}
      Introduction: ${userInput.introduction}

      Please provide a step-by-step plan including:
      1. Getting started
      2. Building the business
      3. Marketing and customer acquisition
      4. Scaling and growth
      5. Key performance indicators`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating success plan:", error);
    throw new Error("Failed to generate success plan. Please try again.");
  }
}