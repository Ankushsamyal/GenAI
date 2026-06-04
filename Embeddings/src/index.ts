import { HfInference } from "@huggingface/inference";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const hf = new HfInference(process.env.HF_API_KEY!);

export type DataWithEmbeddings ={
    input: string,
    embedding: number[]
}

export async function generateEmbedding(input: string | string[]) {
    const response = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: input,
    });

    console.log(response);

    if (typeof input === 'string') {
        return [response as number[]] as number[][];
    }
    return response as number[][];
}

export function loadJSONData<T>(fileName:string) {
    const path = join(__dirname, fileName);
    const rawData = readFileSync(path)
    return JSON.parse(rawData.toString());
}

function saveDataToJsonFile(data: any, fileName: string) {
    const dataString = JSON.stringify(data, null, 2); 
    const dataBuffer = Buffer.from(dataString);
    const path = join(__dirname, `${fileName}.json`);
    writeFileSync(path, dataBuffer);
    console.log(`Saved data to ${fileName}.json`);
}

async function main() {
    const data = loadJSONData<string[]>('data.json');
    const embedding = await generateEmbedding(data);
    const dataWithEmbedding: DataWithEmbeddings[] = [];
    for(let i = 0; i <data.length; i++){
        dataWithEmbedding.push({
            input: data[i],
            embedding: embedding[i]
        })
    } 
    saveDataToJsonFile(dataWithEmbedding, 'dataWithEmbedding') 
}

main()