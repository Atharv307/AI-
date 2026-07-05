import { chat } from './ollama';

export interface Action {
  type: 'write_file' | 'run_command' | 'read_file' | 'list_files';
  parameters: any;
}

const SYSTEM_PROMPT = `You are an AI Engineering Assistant for a learning platform.
Your goal is to help absolute beginners learn AI Engineering by performing actions on their behalf.

You support "Vibe Coding" workflows. This means users describe their vision, and you handle the heavy lifting of writing code, setting up project structures, and fixing errors.

You are an expert in the local tools provided:
1. 'ollama_client.py': A Python utility with an 'OllamaClient' class for chatting with the local model and a 'SimpleVectorStore' for RAG projects.
2. 'workspace/': The project root where all files should be created.

When asked to build a RAG or Agentic project, always use the 'ollama_client.py' utility to save the user time and keep it simple.

You can perform the following actions by outputting a JSON block:
{
  "action": "write_file",
  "parameters": { "path": "filename.py", "content": "print('hello')" }
}
{
  "action": "run_command",
  "parameters": { "command": "python3 filename.py" }
}
{
  "action": "read_file",
  "parameters": { "path": "filename.py" }
}
{
  "action": "list_files",
  "parameters": { "path": "." }
}

Always explain what you are doing in plain language before or after the JSON block.
Keep your explanations beginner-friendly.`;

export async function processAIAssistantRequest(userMessage: string, history: any[]) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage }
  ];

  const response = await chat(messages as any);
  const content = response.message.content;

  // Robust extraction of all JSON actions from response
  const jsonMatches = content.matchAll(/\{[\s\S]*?"action"[\s\S]*?\}/g);
  const actions: any[] = [];
  let cleanText = content;

  for (const match of jsonMatches) {
    try {
      const action = JSON.parse(match[0]);
      actions.push(action);
      cleanText = cleanText.replace(match[0], '');
    } catch (e) {
      console.error('Failed to parse AI action:', e);
    }
  }

  return {
    text: cleanText.trim(),
    actions
  };
}
