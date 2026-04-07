import OpenAI from "openai";
import {writeFileSync, createReadStream} from 'fs'

const openai =new OpenAI()

async function createTeascription() {
    const response = await openai.audio.transcriptions.create({
        file:createReadStream('AudioSample.m4a'), //audio to text make a local audio file which you want to convert to text
        model:'whisper-1',
        language:'en'
    })
    console.log(response)  
}
createTeascription()


async function translation() {
    const response = await openai.audio.translations.create({
        file: createReadStream('FrenchSample.m4a'),
        model:'whisper-1'
    })
    console.log(response)
}


async function textToSpeech() {
    const sampleText = 'France is a country from europe. Its located in western europe';
    const response = await openai.audio.speech.create({
        input: sampleText,
        voice:'alloy',
        model:'tts-1',
        response_format:'mp3',
    })

    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync('France.mp3', buffer);
}
