import { Lesson } from '@/types';

import { Track } from '@/types';

export const tracks: Track[] = [
  { id: 'prompt-engineering', title: 'Prompt Engineering & LLM Basics', description: 'Master the art of communicating with AI.', icon: 'message-square' },
  { id: 'ai-coding', title: 'AI Coding & Vibe Coding', description: 'Build full apps using AI coding agents.', icon: 'code' },
  { id: 'rag-systems', title: 'RAG Systems & Knowledge Assistants', description: 'Connect AI to your own data.', icon: 'database' },
  { id: 'agentic-ai', title: 'Agentic AI & Multi-Agent Systems', description: 'Build autonomous AI teams.', icon: 'users' },
  { id: 'systems-thinking', title: 'Software Systems Thinking & Architecture', description: 'Design complex AI-powered systems.', icon: 'layout' },
  { id: 'mlops', title: 'MLOps, CI/CD & Production Deployment', description: 'Deploy and monitor AI in the real world.', icon: 'rocket' },
];

export const lessons: Lesson[] = [
  {
    id: 'terminal-basics',
    title: 'Terminal & Environment Setup',
    description: 'Get comfortable with the tools of the trade.',
    track: 'ai-coding',
    difficulty: 'beginner',
    content: `
# Lesson 1: Your Engineering Command Center

Before we build AI, we need to know how to talk to our computer. The **Terminal** is where you will run your AI models and your code.

### Objective
Learn basic terminal commands and verify your environment.

### Tasks
1. Type \`ls\` in the terminal to see your files.
2. Type \`python3 --version\` to check if Python is installed.
3. Ask the AI Assistant to create a "Hello World" Python file for you.

### Why the Terminal?
Real AI engineering happens in the terminal. It's faster, more powerful, and allows you to automate complex tasks.
`,
    tasks: [
      { id: 't1', description: 'Run "ls" in terminal', completed: false },
      { id: 't2', description: 'Check Python version', completed: false },
      { id: 't3', description: 'Create hello.py via Assistant', completed: false },
    ],
  },
  {
    id: 'intro-to-prompting',
    title: 'Mastering Prompt Engineering',
    description: 'Learn the fundamentals of communicating with local LLMs.',
    track: 'prompt-engineering',
    difficulty: 'beginner',
    content: `
# Lesson 2: Communicating with Qwen

Now that your environment is ready, let's talk to the brain: **Qwen 2.5**.

### Objective
Learn how to structure prompts to get reliable code and explanations.

### Tasks
1. Go to the **Prompt Playground** tab.
2. Ask Qwen: "Explain what an LLM is to a 5-year-old."
3. Try changing the **Temperature** to 1.0 and ask again. Notice the difference?
4. Ask the AI assistant on the right to create a Python script that calculates Fibonacci numbers.

### Pro Tip
LLMs are sensitive to how you ask. Being specific about the *format* you want (e.g., "Output only JSON") is a key skill.
`,
    tasks: [
      { id: 'p1', description: 'Run a prompt in Playground', completed: false },
      { id: 'p2', description: 'Experiment with Temperature', completed: false },
      { id: 'p3', description: 'Create fibonacci.py', completed: false },
    ],
    initialFiles: {
      'hello_ai.py': 'print("Welcome to AI Engineering!")'
    }
  },
  {
    id: 'build-first-agent',
    title: 'Building Your First AI Agent',
    description: 'Use Python to interact with your local LLM programmatically.',
    track: 'agentic-ai',
    difficulty: 'beginner',
    content: `
# Lesson 3: Code + LLM = Magic

In this lesson, you'll write code that talks to your local LLM. This is the foundation of building **AI Agents**.

### Objective
Create a Python script that sends a prompt to Ollama and prints the response.

### Tasks
1. Ask the AI Assistant to "Write a Python script that uses the \`requests\` library to talk to Ollama's API".
2. Run the script and see it in action.
3. Modify the script to make the AI act like a helpful coding tutor.

### What is an Agent?
An agent is just code that uses an LLM to make decisions or perform tasks. You're building your first one right now!
`,
    tasks: [
      { id: 'a1', description: 'Generate agent script', completed: false },
      { id: 'a2', description: 'Run agent script', completed: false },
      { id: 'a3', description: 'Customize the agent prompt', completed: false },
    ],
  },
  {
    id: 'vibe-coding-site',
    title: 'Vibe Coding: Personal Website',
    description: 'Build a personal website using only AI coding agents.',
    track: 'ai-coding',
    difficulty: 'beginner',
    content: `
# Project: Your Personal Website

In this module, you'll experience **Vibe Coding**. Instead of writing code line-by-line, you'll describe your vision to the AI and refine it until it's perfect.

### Objective
Build a feature-rich personal website with an integrated AI Digital Twin.

### Tasks
1. Ask the AI Assistant: "I want to build a personal website with a hero section, an about me section, and a blog. Use Tailwind CSS."
2. Guide the AI to add a "Chat with my Digital Twin" feature.
3. Deploy your site locally and view it.
`,
    tasks: [
      { id: 'v1', description: 'Generate website structure', completed: false },
      { id: 'v2', description: 'Add AI Digital Twin chat', completed: false },
      { id: 'v3', description: 'View site in browser', completed: false },
    ],
  },
  {
    id: 'rag-knowledge-assistant',
    title: 'Build a RAG Knowledge Assistant',
    description: 'Create an AI that knows your personal documents.',
    track: 'rag-systems',
    difficulty: 'intermediate',
    content: `
# Project: Personal Knowledge Assistant

Learn how to use **RAG (Retrieval-Augmented Generation)** to make an AI that can answer questions based on your own PDF or Text files.

### Objective
Develop a production-ready RAG assistant.

### Tasks
1. Ask the AI to "Write a script that uses LangChain or a simple vector search to read a local document."
2. Integrate the local LLM to answer questions about that document.
3. Add a basic automated testing workflow to verify accuracy.
`,
    tasks: [
      { id: 'r1', description: 'Implement document loading', completed: false },
      { id: 'r2', description: 'Implement vector search', completed: false },
      { id: 'r3', description: 'Connect LLM for QA', completed: false },
    ],
  },
  {
    id: 'capstone-1-digital-twin',
    title: 'Capstone 1: AI Digital Twin',
    description: 'Build a complete AI Digital Twin that represents you professionally.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    content: `
# Capstone: Your AI Digital Twin

Combine everything you've learned to build a sophisticated AI agent that can represent you, answer questions about your experience, and even schedule meetings.

### Tasks
1. Build the frontend (Vibe Coding).
2. Implement the knowledge base (RAG).
3. Deploy as a production-ready tool (MLOps).
`,
    tasks: [
      { id: 'c1-1', description: 'Design Digital Twin Persona', completed: false },
      { id: 'c1-2', description: 'Implement Multi-modal interface', completed: false },
      { id: 'c1-3', description: 'Final Capstone Submission', completed: false },
    ],
  }
];
