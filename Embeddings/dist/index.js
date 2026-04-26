"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default();
async function generateEmbedding(input) {
    const response = await groq.embeddings.create({
        input: input,
        model: 'nomic-embed-text-v1.5'
    });
    console.log(response.data[0]);
    return response;
}
generateEmbedding('cat');
