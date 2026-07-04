import { NextResponse } from 'next/server';
import * as fs from '@/lib/workspace/fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const path = searchParams.get('path') || '.';

  try {
    await fs.ensureWorkspace();

    if (action === 'list') {
      const files = await fs.listFiles(path);
      return NextResponse.json({ files });
    }

    if (action === 'read') {
      const content = await fs.readFile(path);
      return NextResponse.json({ content });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, path, content, command } = await request.json();
    await fs.ensureWorkspace();

    if (action === 'write') {
      await fs.writeFile(path, content);
      return NextResponse.json({ success: true });
    }

    if (action === 'run') {
      const result = await fs.runCommand(command);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
