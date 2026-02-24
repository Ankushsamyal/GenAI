import Groq from "groq-sdk";

const groq = new Groq();

process.stdin.addListener('data', async function (input) {
    const userInput = input.toString().trim();
    const response = await groq.chat.completions.create({
        model:'llama-3.3-70b-versatile',
        messages:[{
            role:'system',
            content:' you are a helpful chatbot'
        },
        {role:'user',
            content:userInput
        }
    ]
    })
    console.log(response.choices[0].message.content)
})

