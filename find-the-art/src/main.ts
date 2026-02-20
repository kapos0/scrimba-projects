import "./styles.css";
import { OpenAI } from "openai";

const APIKEY = import.meta.env.VITE_OPENAI_API_KEY;
if (!APIKEY) {
    alert("API key is missing. Check your .env file.");
    throw new Error("Missing VITE_OPENAI_API_KEY");
}

const userInput = document.getElementById("instruction") as HTMLTextAreaElement,
    revisedInput = document.getElementById(
        "revised-input",
    ) as HTMLTextAreaElement,
    submitBtn = document.getElementById("submit-btn") as HTMLButtonElement,
    outputImg = document.getElementById("output-img") as HTMLDivElement;

const openai = new OpenAI({
    apiKey: APIKEY,
    dangerouslyAllowBrowser: true,
});

function resetUI() {
    userInput.disabled = false;
    revisedInput.disabled = false;
    submitBtn.disabled = false;
}

async function generateImage(prompt: string) {
    if (!prompt) return;
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "256x256",
            response_format: "url",
        });
        if (response.data && response.data[0])
            outputImg.innerHTML = `<img src="${response.data[0].url}">`;
        else
            outputImg.innerHTML =
                "<p>Error: No image generated. Try again.</p>";
        resetUI();
    } catch (error) {
        outputImg.innerHTML = `<p>Error: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
        resetUI();
    }
}

async function reviseInput(prompt: string) {
    if (!prompt) return;
    const messages: Array<{
        role: "system" | "user" | "assistant";
        content: string;
    }> = [
        {
            role: "system",
            content:
                "You are a helpful assistant that helps to revise user input to make it more suitable for image generation.",
        },
        {
            role: "user",
            content: `Revise the following instruction to make it more suitable for image generation: ${prompt}`,
        },
    ];
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages,
            temperature: 1.1,
            presence_penalty: 0,
            frequency_penalty: 0,
        });
        if (
            response.choices &&
            response.choices[0] &&
            response.choices[0].message.content
        )
            generateImage(response.choices[0].message.content);
        else {
            outputImg.innerHTML =
                "<p>Error: Could not revise the prompt. Try again.</p>";
            resetUI();
        }
    } catch (error) {
        outputImg.innerHTML = `<p>Error: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
        resetUI();
    }
}

function handleUserOperations() {
    if (!userInput.value.trim() && !revisedInput.value.trim()) {
        alert("Please enter an instruction.");
        return;
    }
    userInput.disabled = true;
    revisedInput.disabled = true;
    submitBtn.disabled = true;
    outputImg.innerHTML = "<p>Processing your request...</p>";
    if (revisedInput.value) reviseInput(revisedInput.value);
    else generateImage(userInput.value);
}

submitBtn.addEventListener("click", handleUserOperations);
