# Embeddings

Generate text embeddings using Groq API.

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in this directory:
```
GROQ_API_KEY=your_api_key_here
```

## Usage

```bash
npm start
```

## Troubleshooting

If you get a `model_not_found` error:
- Verify your Groq API key is correct
- Check that the model name is valid
- See Groq's supported models documentation

## Available Models

For text embeddings, Groq supports:
- `text-embedding-3-small` (OpenAI)
- `text-embedding-3-large` (OpenAI)
- Other embedding models may be available