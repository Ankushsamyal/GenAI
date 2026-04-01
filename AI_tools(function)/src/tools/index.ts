import Groq from "groq-sdk";
import { describe } from "node:test";

const groqAI = new Groq();

function getTimeOfDay() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    return timeString
}

function getOrderStatus(orderId: string) {
    console.log(`Getting the status of order ${orderId}`)
    const orderAsNumber = parseInt(orderId);
    if (orderAsNumber % 2 == 0) {
        return 'IN_PROGRESS'
    }
    return 'COMPLETED'
}

async function callGroqAIWithTools() {
    const context: Groq.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: 'you are a helpfull assistant that gives information about the time of day and order status'
        },
        {
            role: 'user',
            // content: 'what is the time of day'
            content: 'what is the status of order 1235?'

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

            },
            {
                type: 'function',
                function: {
                    name: 'getOrderStatus',
                    description: ' Return the status of an order',
                    parameters: {
                        type: 'object',
                        properties: {
                            orderId: {
                                type: 'string',
                                describe: 'The id of the order to get the status of'
                            }
                        },
                        require: ['orderId']
                    }
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
        if (toolName == 'getOrderStatus') {
            const rawArgument = toolCall.function.arguments;
            const parsedArgument = JSON.parse(rawArgument);
            const toolResponse = getOrderStatus(parsedArgument.orderId);

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