import { isOllamaRunning, chat, Message, ChatResponse } from './ollama';

export interface Action {
  type: 'write_file' | 'run_command' | 'read_file' | 'list_files';
  parameters: any;
}

const SYSTEM_PROMPT = `You are an AI Engineering Assistant for a learning platform designed for absolute beginners and non-technical users.
Your goal is to help them learn AI Engineering by doing the complex work for them and explaining it simply.

### Vibe Coding
You support "Vibe Coding" workflows. When a user says "Build me a website" or "Create a chatbot," you handle creating all necessary files and folders in the 'workspace/'.

### Proactive Guidance & Mentorship
Your goal is to TEACH, not just do. If a user is stuck, ask them a guiding question first. Explain the conceptual "WHY" before the "HOW".
Always assume the user knows NOTHING about software or AI. Use analogies (e.g., comparing an LLM to a super-powered library assistant).

### Professional Engineering Workflow
Before helping the user write code, ensure they have:
1. **Researched** the problem.
2. **Planned** the solution.
3. Created a **PRD.md** (Product Requirements Document) or **AGENTS.md** in the 'workspace/'.

If they skip these steps, remind them: "A great AI Engineer plans before they prompt."

### Local Expert
You use:
1. 'ollama_client.py': A utility for LLM apps.
2. 'workspace/': The ONLY place you write files.

Always output JSON actions for file work. explain the code concepts simply.

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

const MOCK_RESPONSES: Record<string, string> = {
  "hello": "Hello! I'm your AI guide. It looks like Ollama isn't running locally right now, so I'm operating in 'Offline Mode'. I can still help you with concepts, but my ability to generate complex code is limited. Once you start Ollama, I'll be much more powerful!",
  "prd": "Creating a PRD (Product Requirements Document) is the first step of a great engineer! I've created a template for you in the workspace.",
  "plan": "Planning is 80% of the work. What are you thinking of building? I can help you structure your thoughts.",
};

async function getMockResponse(userMessage: string): Promise<{ text: string, actions: any[] }> {
  const lowerMsg = userMessage.toLowerCase();
  let text = "I'm currently in Offline Mode because Ollama is not detected on your system. Please start Ollama to enable my full intelligence!";
  const actions: any[] = [];

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    text = MOCK_RESPONSES["hello"];
  } else if (lowerMsg.includes("prd") || lowerMsg.includes("document")) {
    text = MOCK_RESPONSES["prd"];
    actions.push({
      action: "write_file",
      parameters: {
        path: "PRD.md",
        content: "# Product Requirements Document\n\n## Overview\n[Describe the project]\n\n## Core Features\n- Feature 1\n- Feature 2\n\n## Tech Stack\n- Python / Ollama"
      }
    });
  } else if (lowerMsg.includes("plan")) {
    text = MOCK_RESPONSES["plan"];
  }

  return { text, actions };
}

export async function processAIAssistantRequest(userMessage: string, history: any[]) {
  // Check if Ollama is running
  const ollamaActive = await isOllamaRunning();

  if (!ollamaActive) {
    return await getMockResponse(userMessage);
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage }
  ];

  try {
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
  } catch (error) {
    console.error('Ollama chat failed, falling back to mock:', error);
    return await getMockResponse(userMessage);
  }
}
