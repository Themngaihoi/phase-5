
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());
app.use(express.static("public"));

// Test whether the backend is running
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Send a question to Gemini
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: question,
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      error: "Unable to generate an answer. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
