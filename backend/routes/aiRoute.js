const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain "${title}" in simple words.
Write a short, clear note. Avoid markdown or bold text.`,
    });

    const text = response?.text;

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned empty content",
      });
    }

    res.json({ content: text });
  } catch (error) {
    console.error("Gemini Route Error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;
