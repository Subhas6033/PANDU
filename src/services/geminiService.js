// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const processVoiceCommand = async (transcript) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });

    const prompt = `
    You are a highly intelligent, conversational AI voice assistant named "Pandu", created on April 20, 2024, by a developer named Subhas.
    
    The user just said: "${transcript}".

    Your job is to be a fully capable AI. 
    
    URL GENERATION RULES:
    1. If the user asks to open a general website or a specific public profile (like "open github/gizemcell" or "open netflix"), you must figure out the standard URL yourself and return action="open_url".
    2. If the user asks to search for something, generate a Google search URL.
    3. If the user asks to play a specific song, generate the direct YouTube video URL (https://www.youtube.com/watch?v=...). DO NOT return a search results page.
    4. If the user asks to play a random song, pick a popular song yourself and return its direct YouTube video URL.
    
    PERSONAL OVERRIDES (Only use these exact URLs if the user asks for THESE specific things):
    - "my facebook profile": https://www.facebook.com/profile.php?id=100049621998517
    - "my instagram": https://www.instagram.com/goalkeepersubhas/
    - "my github": https://github.com/Subhas6033

    Respond STRICTLY with a JSON object in this exact format:
    {
      "reply": "Your conversational response",
      "action": "none" | "open_url",
      "url": "The URL to open, or null"
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { 
            reply: "Sorry, I had trouble connecting to my AI brain.", 
            action: "none", 
            url: null 
        };
    }
};