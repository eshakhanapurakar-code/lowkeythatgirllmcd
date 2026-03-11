import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const MCD_URL = "https://mcdelivery.co.in/";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function sendMessage(history: ChatMessage[], message: string) {
  if (!API_KEY) {
    throw new Error("Gemini API key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // We use generateContent with urlContext
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ],
    config: {
      systemInstruction: `You are a helpful and friendly McDonald's India (McDelivery) assistant. 
      Your goal is to help customers with their queries about the menu, current offers, delivery process, and general information about McDonald's in India.
      Use the provided URL context (https://mcdelivery.co.in/) to give accurate and up-to-date information.
      If you don't know the answer, suggest they visit the website or contact customer support.
      Keep your tone cheerful, professional, and helpful.
      Format your responses using Markdown for better readability.`,
      tools: [{ urlContext: {} }]
    }
  });

  return response.text || "I'm sorry, I couldn't process that request.";
}
