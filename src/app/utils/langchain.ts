// import weaviate from 'weaviate-ts-client';
// import { ApiKey } from "weaviate-ts-client"
// import { ChatOpenAI } from '@langchain/openai';
// import { WeaviateStore } from "@langchain/weaviate";
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import type { Document } from "@langchain/core/documents";


// const weaviateClient = weaviate.client({
//     scheme: process.env.WEAVIATE_SCHEME ?? "http", 
//     host: process.env.WEAVIATE_URL ?? "localhost:8080", 
//     apiKey: new ApiKey(process.env.WEAVIATE_API_KEY ?? "default"), 
//   });

// const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
//     client: weaviateClient,
//     indexName: 'Cba_chunks', 
//     textKey: 'text', 
// });

// const retriever = vectorStore.asRetriever({
//     k: 20,
// });

// const SYSTEM_TEMPLATE = ` You are a helpful assistant that generates Community Benefits Agreement (CBA) drafts for renewable energy projects. 
//                 Your outputs should be professional, well-structured, and use appropriate legal and technical terminology. 
//                 CBA drafts should include legal definitions, recitals, deliniated community benefits, and the rights/access 
//                 that the project developer gets in return, as well as anything else deemed important, but should not exceed 10000 words. 
//                 Typical community benefits include community charity donations, community benefit funds to be managed by a local 
//                 government, recreational buildings and activities, and local hiring and training programs, among other things. 
//     Use the following CBA excerpts to inform your resonse.
//     CBA Excerpts:
//     {context} `;

// const prompt = ChatPromptTemplate.fromMessages([
//     ["system", SYSTEM_TEMPLATE],
//     ["human", "{question}"], // TODO Change this var name? It's not really a question
//     ]);

// const model = new ChatOpenAI({
//   temperature: 0.3,
//   modelName: 'gpt-4',
// });

// const formatDocumentsAsString = (documents: Document[]) => {
//     return documents.map((document) => document.pageContent).join("\n\n");
//   };

// // Create the chain using pipe() and RunnableSequence
// const ragChain = RunnableSequence.from([
//     {
//       question: new RunnablePassthrough(), 
//       context: retriever.pipe(formatDocumentsAsString),
//     }, 
//     prompt,
//     model, 
//     new StringOutputParser(), 
//   ]);


// // Export this function for route handlers
// export const generateRagCba = async (userPrompt: string): Promise<string> => {
//   const response = await ragChain.invoke({ question: userPrompt });
//   console.log("RAG pipeline response: ", response);
//   return response;
// };

export const generateRagCba = async (userPrompt: string): Promise<string> => {
    // Placeholder implementation - replace with actual RAG logic
    console.log("Received user prompt for RAG CBA generation: ", userPrompt);
    return `This is a placeholder response for the RAG CBA generation based on the prompt: "${userPrompt}". Replace this with actual RAG logic to retrieve relevant CBA excerpts and generate a draft.`;
};
