async function getEmbedding(input: string | string[]): Promise<number[][]> {
    const inputs = Array.isArray(input) ? input : [input];

    const embeddings = await Promise.all(
        inputs.map(async (text) => {
            const response = await fetch("http://localhost:11434/api/embeddings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "nomic-embed-text",
                    prompt: text
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.embedding as number[];
        })
    );

    return embeddings;
}

// ✅ Use it anywhere like this — no need to touch the function
async function main() {
    const single = await getEmbedding("cat is on the roof");
    console.log("Single embedding length:", single[0]);

    // const multiple = await getEmbedding(["cat", "dog", "bird"]);
    // console.log("Multiple embeddings count:", multiple);
}

main();