import Groq from 'groq-sdk'

const groq = new Groq()

async function main() {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
            role: 'user',
            content: 'How tall is mount status of iron man of india'
        }]
    })
    console.log(response.choices[0].message.content)
}

main();