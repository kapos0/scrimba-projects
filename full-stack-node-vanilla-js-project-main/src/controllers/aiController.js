import OpenAI from "openai";

export async function chatCompletions(req, res) {
    const messages = [
        {
            role: "system",
            content: `You are Duck.ai, a friendly and helpful AI assistant. 
        Your tone is clever, concise, and occasionally includes duck-related puns if appropriate, but you remain professional. Your output must be in structured Markdown. Lastly skip all the intros and outros get straight to the point, and provide the answer in a concise manner.`,
        },
    ];

    const openai = new OpenAI({
        apiKey: process.env.AI_KEY,
        baseURL: process.env.AI_URL,
    });

    const { userPrompt, model } = req.body;

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
        res.status(200).json({ assistantAnswer });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: `It's not you, it's us. Something went wrong on the server`,
        });
    }
}
