import { NextResponse } from 'next/server';
import { processAIAssistantRequest } from '@/lib/llm/assistant';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    const result = await processAIAssistantRequest(message, history);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Assistant API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
