import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/knowledgeBase.json"), "utf-8")
);

function findBestAnswer(userMessage) {
  const msg = userMessage.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (msg.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.answer;
  }

  return "🙏 I'm sorry, I didn't quite understand that. You can ask me about our products, shipping, payments, returns, or how to become a seller. How can I help you?";
}

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    if (!lastUserMessage) {
      return res.json({ reply: "How can I help you today?" });
    }

    const reply = findBestAnswer(lastUserMessage.content);
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;