import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messages: ChatCompletionMessageParam[] = [
    {
        role: "system",
        content: `You are Duck.ai, a friendly and helpful AI assistant. 
        Your tone is clever, concise, and occasionally includes duck-related puns if appropriate, but you remain professional. Your output must be in structured Markdown. Lastly skip all the intros and outros get straight to the point, and provide the answer in a concise manner.`,
    },
];

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
});

app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, "../public", `${page}.html`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`File not found: ${page}.html`);
            res.status(404).sendFile(
                path.join(__dirname, "../public", "404.html"),
            );
        }
    });
});

app.get("/api/ask", async (req, res) => {
    //const { userPrompt, model } = req.body;
    const model = "openai/gpt-oss-20b";
    const userPrompt = "hello, how are you?";

    messages.push({
        role: "user",
        content: userPrompt,
    });

    try {
        const response = await openai.chat.completions.create({
            model: model || process.env.AI_MODEL,
            messages,
        });
        const assistantAnswer = response.choices[0].message.content;
        console.log("Assistant answer:", assistantAnswer);
        res.json({ assistantAnswer });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: `It's not you, it's us. Something went wrong on the server`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
