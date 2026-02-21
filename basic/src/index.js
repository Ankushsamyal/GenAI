import {OpenAI} from 'openai'

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})
async function main(){
    const response = await openai.chat.completions.create({
        model:'llama-3.3-70b-versatile',
        messages:[{
            role: 'user',
            content:'How tall is mount status of iron man of india'
        }]
    })
    console.log(response.choices[0].message.content)

}

main();