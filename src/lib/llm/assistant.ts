import { chat } from './ollama';

export interface Action {
  type: 'write_file' | 'run_command' | 'read_file' | 'list_files';
  parameters: any;
}

const SYSTEM_PROMPT = `You are an AI Engineering Assistant for a learning platform.
Your goal is to help absolute beginners learn AI Engineering by performing actions on their behalf.

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

  // Simple extraction of JSON from response
  const jsonMatch = content.match(/\{[\s\S]*"action"[\s\S]*\}/);
  let action = null;
  let cleanText = content;

  if (jsonMatch) {
    try {
      action = JSON.parse(jsonMatch[0]);
      cleanText = content.replace(jsonMatch[0], '').trim();
    } catch (e) {
      console.error('Failed to parse AI action:', e);
    }
  }

  return {
    text: cleanText,
    action
  };
}
