import Groq from "groq-sdk";
import { encoding_for_model } from "tiktoken";

const groq = new Groq();

async function main() {
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "you response like a bro ",
            },
            {
                role: "user",
                content: "How tall is mount status of iron man of india",
            },
        ],
    });
    console.log(response.choices[0].message);
}

function encodePrompt() {
    const prompt = "How tall is mount status of iron man of india";
    const encoder = encoding_for_model("chatgpt-4o-latest");
    const words = encoder.encode(prompt);
    console.log(words);
}

main();
