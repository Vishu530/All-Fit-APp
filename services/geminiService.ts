import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const foodSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The common name of the food item."
    },
    calories: {
      type: Type.NUMBER,
      description: "The number of calories for the specified serving size. If a range is typical, provide an average."
    },
    servingSize: {
      type: Type.STRING,
      description: "A human-readable description of the serving size, e.g., '1 cup' or '1 medium apple'."
    }
  },
  required: ["name", "calories", "servingSize"]
};


export const searchFoodCalories = async (query: string): Promise<{ name: string; calories: number; servingSize: string } | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide the nutritional information for this food item: ${query}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: foodSchema,
      },
    });

    const text = response.text.trim();
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Error fetching food data from Gemini API:", error);
    return null;
  }
};
