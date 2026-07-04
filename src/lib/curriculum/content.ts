import { Lesson } from '@/types';

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
  }
];
