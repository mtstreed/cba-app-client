import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCbaDraft(projectDescription: string) {
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "system",
                content: "You are a helpful assistant that generates Community Benefits Agreement (CBA) drafts for renewable energy projects. Your outputs should be professional, well-structured, and use appropriate legal and technical terminology."
            }, {
                role: "user",
                content: `Please create a CBA draft for the following renewable energy project: ${projectDescription}. Do not include anything other than the CBA draft, such as exhibits, examples, etc. Please keep this CBA to 10000 words or less.`
            }],
            temperature: 0.3,
        });
        console.log(completion.choices[0].message.content || 'No content generated');
        return completion.choices[0].message.content || 'No content generated';
    } catch (error) {
        console.error('Error in generateCbaDraft:', error);
        throw new Error('Failed to generate CBA draft');
    }
}
