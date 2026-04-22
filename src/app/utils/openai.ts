import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const CBA_SYSTEM_PROMPT = `You are a helpful assistant that generates Community Benefits Agreement (CBA) drafts for renewable energy projects.
Your outputs should be professional, well-structured, and use appropriate legal and technical terminology.
CBA drafts should include legal definitions, recitals, delineated community benefits, and the rights/access
that the project developer gets in return, as well as anything else deemed important, but should not exceed 10000 words.
Typical community benefits include community charity donations, community benefit funds to be managed by a local
government, recreational buildings and activities, and local hiring and training programs, among other things.`;

export async function generateCbaDraft(projectDescription: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "system",
                content: CBA_SYSTEM_PROMPT,
            }, {
                role: "user",
                content: `Please create a CBA draft for the following renewable energy project: ${projectDescription}. Do not include anything other than the CBA draft, such as exhibits, examples, etc.`
            }],
            temperature: 0.3,
        });
        return completion.choices[0].message.content || 'No content generated';
    } catch (error) {
        console.error('Error in generateCbaDraft:', error);
        throw new Error('Failed to generate CBA draft');
    }
}
