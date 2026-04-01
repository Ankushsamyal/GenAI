import Groq from "groq-sdk";

const groqAI = new Groq();

function getTimeOfDay() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    return timeString
}

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
        messages: context,
        tools: [
            {
                type: 'function',
                function: {
                    name: 'getTimeOfDay',
                    description: 'get the time of day'
                }

            }
        ],
        tool_choice: 'auto' // the engine will decide which tool to use
    })
    //decide if tool call is required
    const willInvonkeFunction = response.choices[0].finish_reason = 'tool_calls'
    const toolCall = response.choices[0].message.tool_calls![0];

    if (willInvonkeFunction) {
        const toolName = toolCall.function.name;
        if (toolName == 'getTimeOfDay') {
            const toolResponse = getTimeOfDay()

            context.push(response.choices[0].message);
            context.push({
                role: 'tool',
                content: toolResponse,
                tool_call_id: toolCall.id
            })
        }
    }
    const secondResponse = await groqAI.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: context
    })

    console.log(secondResponse.choices[0].message)
}

callGroqAIWithTools();