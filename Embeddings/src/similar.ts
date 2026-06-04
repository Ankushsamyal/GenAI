// Common Vector Operations in Programming

import { DataWithEmbeddings, generateEmbedding, loadJSONData } from "./index";

// Vector Addition: Add corresponding elements.
// Example:
// [1, 2, 3] + [4, 5, 6] = [5, 7, 9]

// Scalar Multiplication: Multiply each element by a constant.
// Example:
// 2 ⋅ [1, 2, 3] = [2, 4, 6]

// Dot Product: Multiply corresponding elements and sum them.
// Example:
// [1, 2, 3] ⋅ [4, 5, 6] = 32
// → Used in machine learning for similarity measures.

// Cross Product: Only in 3D; produces a vector perpendicular to both inputs.
// Example:
// [1, 0, 0] × [0, 1, 0] = [0, 0, 1]

// Normalization: Scale vector to length 1 (unit vector).
// Useful in graphics and physics for direction calculations.

function dotProduct(a:number[], b:number[]){ 
  return a.map((value, index)=> value * b[index]).reduce((a,b)=>a+b,0)
}

function cosineSimilarity(a:number[], b:number[]){
    const products = dotProduct(a,b);
    const aMagnitude = Math.sqrt(a.map(value => value * value).reduce((a,b)=>a+b,0));
    const bMagnitude = Math.sqrt(b.map(value => value * value).reduce((a,b)=>a+b,0));
    return products / (aMagnitude*bMagnitude);
}


async function main() {
    const dataWithEmbedding = loadJSONData<DataWithEmbeddings[]>('dataWithEmbedding.json');

    const input = 'animal';
    const inputEmbedding = await generateEmbedding(input)
    const similarities:{
        input: string,
        similarity: number
    }[] = [];

    for(const entry of dataWithEmbedding){
        const similarity = cosineSimilarity(
            entry.embedding,
            inputEmbedding[0]
        )
        similarities.push({
            input: entry.input,
            similarity
        })
    }

    console.log(`Similarity of ${input} with:`)
    const sortSimilarities  = similarities.sort((a,b)=> b.similarity - a.similarity);
 
sortSimilarities.forEach(similarity =>{ console.log(`${similarity.input}: ${similarity.similarity}`)})
    
}


main()