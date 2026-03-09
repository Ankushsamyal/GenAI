import Groq from "groq-sdk";

const groq = new Groq();

const context: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    {
        role: 'system',
        content: ' you are a helpful chatbot'
    }
]

async function createChatCompletions() {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: context
    })
    const responseMessage = response.choices[0].message;
    context.push({
        role: 'assistant',
        content: responseMessage.content
    })

    console.log(`${response.choices[0].message.role} : ${response.choices[0].message.content}`)
}

process.stdin.addListener('data', async function (input) {
    const userInput = input.toString().trim();
    context.push({
        role: 'user',
        content: userInput
    })
    await createChatCompletions()
})

