import { NextResponse } from 'next/server';
import { chat } from '@/lib/llm/ollama';

export async function POST(request: Request) {
  try {
    const { prompt, temperature } = await request.json();

    // We can pass options like temperature if we update ollama.ts,
    // but for now let's keep it simple.
    const result = await chat([
      { role: 'user', content: prompt }
    ]);

    return NextResponse.json({ content: result.message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
