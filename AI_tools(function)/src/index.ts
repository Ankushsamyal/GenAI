import Groq from "groq-sdk";

const groqAI = new Groq();
console.log('first')

async function callGroqAIWithTools() {
    const context: Groq.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: 'you are a helpfull, friendly like childhood friend ans with some shit words '
        },
        {
            role: 'user',
            content: 'what is the time of day'

        }]
    const response = await groqAI.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: context
    })
    console.log(response.choices[0].message.content)
}

callGroqAIWithTools();