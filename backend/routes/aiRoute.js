const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const hfResponse = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "user",
              content: `Write a short, clear note on the topic: ${title}, no bold letters just simple content.`,
            },
          ],
          max_tokens: 300,
        }),
      }
    );

    // 🔴 Handle HF errors explicitly
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("HF Error:", hfResponse.status, errorText);
      return res.status(500).json({ error: "Hugging Face API failed" });
    }

    const data = await hfResponse.json();

    const generatedText =
      data?.choices?.[0]?.message?.content ||
      "AI could not generate content.";

    res.json({ content: generatedText });
  } catch (error) {
    console.error("AI Route Error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;
