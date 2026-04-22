import { Pinecone } from '@pinecone-database/pinecone';
import { openai, CBA_SYSTEM_PROMPT } from './openai';

if (!process.env.PINECONE_API_KEY) throw new Error('PINECONE_API_KEY not set');

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index(process.env.PINECONE_INDEX ?? 'cbas');

export async function generateRagCba(projectDescription: string): Promise<string> {
    // Step 1: Embed the user's query into the same vector space as the stored chunks
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: projectDescription,
    });
    const queryVector = embeddingResponse.data[0].embedding;

    // Step 2: Find the 10 most semantically similar chunks in Pinecone
    const searchResults = await index.query({
        vector: queryVector,
        topK: 10,
        includeMetadata: true,
    });
    const chunks = searchResults.matches
        .map(m => m.metadata?.text as string)
        .filter(Boolean);

    // Step 3: Format retrieved chunks as context
    const context = chunks.length > 0
        ? chunks.join('\n\n---\n\n')
        : 'No relevant CBA excerpts found.';

    // Step 4: Generate the CBA draft with real excerpts injected as context
    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: `${CBA_SYSTEM_PROMPT}\nUse the following real CBA excerpts to inform your response.\n\nCBA Excerpts:\n${context}`,
            },
            {
                role: 'user',
                content: `Please create a CBA draft for the following renewable energy project: ${projectDescription}. Do not include anything other than the CBA draft, such as exhibits, examples, etc.`,
            },
        ],
        temperature: 0.3,
    });

    return completion.choices[0].message.content ?? 'No content generated';
}
