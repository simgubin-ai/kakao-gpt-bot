import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body.message || "").trim();
    if (!message) {
      return res.status(400).json({ reply: "메시지가 비어 있어요." });
    }

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: message
    });

    return res.json({
      reply: response.output_text || "응답 없음"
    });
  } catch (e) {
    console.error("OPENAI ERROR:", e);
    return res.status(500).json({
      reply: "SERVER_ERROR: " + (e?.message || String(e))
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
