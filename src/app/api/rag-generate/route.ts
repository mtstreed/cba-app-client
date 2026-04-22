import { NextRequest, NextResponse } from "next/server";
import { generateRagCba } from "@/app/utils/rag";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { projectDescription } = await req.json();

    if (!projectDescription || typeof projectDescription !== "string") {
      return NextResponse.json(
        { error: "Project description is required" },
        { status: 400 }
      );
    }

    const content = await generateRagCba(projectDescription);
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in RAG generate route:", error);
    return NextResponse.json(
      { error: "Failed to generate CBA draft" },
      { status: 500 }
    );
  }
}
