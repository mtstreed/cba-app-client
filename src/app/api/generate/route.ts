import { NextResponse } from 'next/server';
import { generateCbaDraft } from '@/app/utils/openai';

export async function POST(request: Request) {
    try {
        const { projectDescription } = await request.json();
        
        if (!projectDescription) {
            return NextResponse.json(
                { error: 'Project description is required' },
                { status: 400 }
            );
        }

        const content = await generateCbaDraft(projectDescription);
        return NextResponse.json({ content });
    } catch (error) {
        console.error('Error in generate API route:', error);
        return NextResponse.json(
            { error: 'Failed to generate CBA draft' },
            { status: 500 }
        );
    }
} 