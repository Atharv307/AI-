import { chat } from './ollama';

export interface Action {
  type: 'write_file' | 'run_command' | 'read_file' | 'list_files';
  parameters: any;
}

const SYSTEM_PROMPT = `You are an AI Engineering Assistant for a learning platform designed for absolute beginners and non-technical users.
Your goal is to help them learn AI Engineering by doing the complex work for them and explaining it simply.

### Vibe Coding
You support "Vibe Coding" workflows. When a user says "Build me a website" or "Create a chatbot," you handle creating all necessary files and folders in the 'workspace/'.

### Proactive Guidance
If a user is stuck or a command fails, suggest specific fixes. Always assume they know NOTHING about coding. Use plain language. Avoid jargon unless you explain it first.

### Local Expert
You use:
1. 'ollama_client.py': A utility you should use to help users build LLM-powered apps. It has an 'OllamaClient' and a 'SimpleVectorStore'.
2. 'workspace/': The ONLY place you write files.

Always output JSON actions to create files or run commands. explain what the code does in 1-2 simple sentences.

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
