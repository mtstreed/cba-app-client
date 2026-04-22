import { NextRequest, NextResponse } from "next/server";
import { generateRagCba } from "@/app/utils/rag";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Request body must include a 'question' string." },
        { status: 400 }
      );
    }

    const result = await generateRagCba(question);

    return NextResponse.json({ result });
  } catch ( error ) {
    console.error("Error in RAG route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
