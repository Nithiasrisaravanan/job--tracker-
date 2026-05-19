import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}