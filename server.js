import express from "express";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMsg = req.body.message;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: userMsg }
                ]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (e) {
        res.json({ reply: "에러 발생 😢" });
    }
});

app.get("/", (req, res) => {
    res.send("서버 정상 작동중");
});

app.listen(3000, () => console.log("서버 실행중"));