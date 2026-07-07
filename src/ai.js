// src/ai.js
import { GoogleGenAI } from '@google/genai/web';

// Initialize the client. In development, we can pull from import.meta.env
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function getWorkoutFromGemini(goalsArray, equipmentArray, isBodyweightOnly) {
  // format the parameters into text strings for the prompt
  const goalsString = goalsArray.join(', ');
  const equipmentString = isBodyweightOnly 
    ? 'No equipment (Pure Bodyweight training only)' 
    : equipmentArray.join(', ');

  // draft an explicit system instruction prompt
  const prompt = `
    You are an elite personal trainer and fitness programmer. 
    Create a brief, highly concise workout routine based on these user constraints:
    
    - Target Goals: ${goalsString}
    - Available Equipment: ${equipmentString}
    
    Keep the routine punchy, minimal, and easy to scan. Avoid unnecessary fluff or long explanations.
    
    Return clean, predictable Markdown using these exact section headers:
    ## Workout Overview
    ## Warm-up
    ## Main Workout
    ## Cool Down
    ## Notes

    Formatting rules:
    - Use short bullets under each section.
    - For exercises, use this pattern when possible: **Exercise Name:** sets/reps/time - brief note.
    - Do not use horizontal rules, "---", "***", or decorative separators.
    - Do not wrap the response in a code block.
    - Do not mention any equipment that was not explicitly provided in the list.
  `;

  try {
    // call the Gemini 2.5 Flash model text generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate workout. Please try again.", { cause: error });
  }
}
