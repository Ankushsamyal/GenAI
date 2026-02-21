# 🤖 GenAI Basics — Node.js Starter

A beginner-friendly Node.js project to get started with AI APIs. This project uses **Groq API** as a free alternative to OpenAI.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root of the project:
```
GROQ_API_KEY=your_groq_api_key_here
```
Get your free API key at 👉 [console.groq.com](https://console.groq.com)

### 3. Run the Project
```bash
npm start
```

---

## 🔑 Why Groq Instead of OpenAI?

[OpenAI](https://platform.openai.com) requires a paid plan to access its API. **Groq** offers a free tier with fast inference speeds — making it perfect for learning and prototyping.

The Groq SDK is a drop-in compatible alternative and uses the same chat completions format.

---

## 📊 API Comparison

| Feature | OpenAI API | Groq API |
|---|---|---|
| **Text (Text → Text)** | GPT-4, GPT-3.5-Turbo | LLaMA 3.3 70B, Mixtral |
| **Image (Text → Image)** | DALL·E | ❌ Not supported |
| **Audio (Text → Speech)** | Whisper TTS | ❌ Not supported |
| **Audio (Speech → Text)** | Whisper STT | Whisper (via Groq) |
| **Video (Text → Video)** | Sora | ❌ Not supported |
| **Free Tier** | ❌ No | ✅ Yes |
| **Speed** | Standard | ⚡ Very Fast |

---

