import { Lesson, Track } from '@/types';

export const tracks: Track[] = [
  { id: 'prompt-engineering', title: 'Prompt Engineering & LLM Basics', description: 'Master the art of communicating with AI.', icon: 'message-square' },
  { id: 'ai-coding', title: 'AI Coding & Vibe Coding', description: 'Build full apps using AI coding agents.', icon: 'code' },
  { id: 'rag-systems', title: 'RAG Systems & Knowledge Assistants', description: 'Connect AI to your own data.', icon: 'database' },
  { id: 'agentic-ai', title: 'Agentic AI & Multi-Agent Systems', description: 'Build autonomous AI teams.', icon: 'users' },
  { id: 'systems-thinking', title: 'Software Systems Thinking & Architecture', description: 'Design complex AI-powered systems.', icon: 'layout' },
  { id: 'mlops', title: 'MLOps, CI/CD & Production Deployment', description: 'Deploy and monitor AI in the real world.', icon: 'rocket' },
];

export const lessons: Lesson[] = [
  // --- TRACK: PROMPT ENGINEERING & LLM BASICS ---
  {
    id: 'pe-1',
    title: 'Prompt Engineering Fundamentals',
    description: 'Learn specificity, context, and formatting for non-technical users.',
    track: 'prompt-engineering',
    difficulty: 'beginner',
    content: `
# Lesson 1: Talking to the Brain

As an AI Engineer, your primary tool is natural language. You don't need to know Python yet—you just need to know how to explain your vision.

### Building Task:
1. Open the **Playground** tab.
2. Tell the AI: "You are a world-class travel agent. Plan a 3-day trip to Tokyo focus on hidden local spots."
3. Now try: "Plan the same trip but output it as a table with columns: Day, Location, Activity, Why it is special."

### What you learned:
- **Roles**: Giving the AI a persona improves quality.
- **Formatting**: Asking for tables/JSON makes data usable.
`,
    tasks: [{ id: 'pe1', description: 'Try 3 different personas in Playground', completed: false }],
  },

  // --- TRACK: AI CODING & VIBE CODING (Course 1 Focus) ---
  {
    id: 'vc-website',
    title: 'Project 1: Personal Website with AI Digital Twin',
    description: 'Build a feature-rich personal website using only AI coding agents.',
    track: 'ai-coding',
    difficulty: 'beginner',
    content: `
# Project: Your Digital Home

We are going to use **Vibe Coding**. You describe the website, and the AI builds it.

### Your Build Plan:
1. Click **Initialize Starter Files** below.
2. Ask the Assistant: "Build me a modern portfolio website using Tailwind CSS. Include a 'Chat with my AI Digital Twin' section."
3. Refine the Vibe: "Make the colors more Linear-style (dark purple and black)."

### Key Learnings:
- Vibe Coding workflows
- Integrating AI into web apps
`,
    tasks: [
      { id: 'vc1-1', description: 'Initialize website structure', completed: false },
      { id: 'vc1-2', description: 'Add AI Digital Twin chat component', completed: false },
      { id: 'vc1-3', description: 'View site in terminal using python -m http.server', completed: false }
    ],
  },
  {
    id: 'vc-kanban',
    title: 'Project 2: Kanban Project Management Platform',
    description: 'Kanban-based platform with a chat interface.',
    track: 'ai-coding',
    difficulty: 'beginner',
    content: `
# Project: AI Kanban Board

Build a productivity tool where you can manage tasks and talk to an AI assistant about your progress.

### Build Plan:
1. Initialize the project.
2. Ask AI: "Build a React-based Kanban board with Drag and Drop."
3. Add AI: "Integrate a sidebar chat where I can ask 'What should I do next?'"
`,
    tasks: [
      { id: 'vc2-1', description: 'Build board UI with AI', completed: false },
      { id: 'vc2-2', description: 'Integrate task-aware chatbot', completed: false }
    ],
  },
  {
    id: 'vc-legal',
    title: 'Project 3: SaaS Legal Assistant',
    description: 'Drafts legal documents + PDF download.',
    track: 'ai-coding',
    difficulty: 'intermediate',
    content: `
# Project: Legal SaaS

Learn how to handle complex document generation and file exports.

### Build Plan:
1. Create a prompt-to-legal-doc engine.
2. Implement PDF export logic using AI assistance.
`,
    tasks: [
      { id: 'vc3-1', description: 'Implement document templates', completed: false },
      { id: 'vc3-2', description: 'Add PDF download functionality', completed: false }
    ],
  },

  // --- TRACK: RAG SYSTEMS & KNOWLEDGE ASSISTANTS (Course 2 Focus) ---
  {
    id: 'rag-personal',
    title: 'Project: RAG-based Personal Knowledge Assistant',
    description: 'Connect AI to your own personal documents.',
    track: 'rag-systems',
    difficulty: 'intermediate',
    content: `
# Project: My AI Knowledge Base

Learn how **RAG (Retrieval-Augmented Generation)** works by letting the AI read your private notes.

### Your Build Plan:
1. Initialize the RAG workspace.
2. Use \`SimpleVectorStore\` from \`ollama_client.py\` to index your text files.
3. Chat with the LLM and see it reference your files!
`,
    tasks: [
      { id: 'r1', description: 'Index local text files', completed: false },
      { id: 'r2', description: 'Run Q&A over indexed documents', completed: false }
    ],
  },
  {
    id: 'rag-company',
    title: 'Project: RAG Knowledge Worker (Company Expert)',
    description: 'High-accuracy expert for technical documentation.',
    track: 'rag-systems',
    difficulty: 'advanced',
    content: `
# Project: The Company Expert

Scale up your RAG system to handle thousands of technical documents with high accuracy.
`,
    tasks: [{ id: 'r3', description: 'Optimize retrieval accuracy to >90%', completed: false }],
  },

  // --- TRACK: AGENTIC AI & MULTI-AGENT SYSTEMS ---
  {
    id: 'ag-research',
    title: 'Project: Multi-Agent System for Research',
    description: 'Orchestrate multiple agents to perform deep research.',
    track: 'agentic-ai',
    difficulty: 'intermediate',
    content: `
# Project: Autonomous Research Team

Build a team:
- **Researcher**: Scrapes data.
- **Analyst**: Finds insights.
- **Writer**: Compiles the report.
`,
    tasks: [
      { id: 'a1', description: 'Define 3 specialized agent roles', completed: false },
      { id: 'a2', description: 'Implement autonomous handoff loop', completed: false }
    ],
  },
  {
    id: 'ag-support',
    title: 'Project: Multi-modal Customer Support Agent',
    description: 'Agent with UI + function calling capability.',
    track: 'agentic-ai',
    difficulty: 'intermediate',
    content: '# Project: Support Agent\nBuild an agent that can actually "click buttons" and "check databases" to help users.',
    tasks: [{ id: 'a4', description: 'Implement function calling for DB lookups', completed: false }],
  },

  // --- TRACK: SOFTWARE SYSTEMS THINKING & ARCHITECTURE ---
  {
    id: 'st-brochure',
    title: 'Project: AI-Powered Brochure Generator',
    description: 'Web scraping + intelligent navigation.',
    track: 'systems-thinking',
    difficulty: 'intermediate',
    content: '# Project: Brochure Generator\nTransform any company website into a marketing brochure using AI.',
    tasks: [{ id: 's1', description: 'Implement web scraper with AI cleaning', completed: false }],
  },
  {
    id: 'st-optimizer',
    title: 'Project: Python to C++ Code Optimizer',
    description: 'Architect a 60,000x performance boost tool.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    content: '# Project: Extreme Optimizer\nUse LLMs to rewrite slow Python logic into lightning-fast C++.',
    tasks: [{ id: 's2', description: 'Generate and compile optimized C++ code', completed: false }],
  },
  {
    id: 'st-prediction',
    title: 'Project: Product Price Prediction',
    description: 'Predict prices using frontier and fine-tuned models.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    content: '# Project: Price AI\nBuild a model that understands market trends.',
    tasks: [{ id: 's3', description: 'Train a simple price regressor with LLM insights', completed: false }],
  },

  // --- TRACK: MLOPS, CI/CD & PRODUCTION ---
  {
    id: 'ml-pipeline',
    title: 'Project: Basic CI/CD Pipeline for AI',
    description: 'Automate testing and deployment of your agents.',
    track: 'mlops',
    difficulty: 'intermediate',
    content: '# Project: AI Pipeline\nLearn to deploy your AI apps automatically when you save code.',
    tasks: [{ id: 'm1', description: 'Configure automated testing workflow', completed: false }],
  },

  // --- 5 MAJOR CAPSTONES ---
  {
    id: 'cap-1',
    title: 'Capstone 1: Complete AI Digital Twin',
    description: 'Build a comprehensive AI twin representing you professionally.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    content: '# Capstone: Your AI Twin\nEverything you learned in Track 2 & 5 combined.',
    tasks: [{ id: 'c1', description: 'Final launch of Digital Twin', completed: false }],
  },
  {
    id: 'cap-2',
    title: 'Capstone 2: Autonomous Multi-Agent Research Team',
    description: 'With tools and terminal usage.',
    track: 'agentic-ai',
    difficulty: 'advanced',
    content: '# Capstone: Research Swarm\nAgents that can browse the web and write files autonomously.',
    tasks: [{ id: 'c2', description: 'Complete research team system', completed: false }],
  },
  {
    id: 'cap-3',
    title: 'Capstone 3: Production-Ready RAG Assistant',
    description: 'With CI/CD deployment.',
    track: 'mlops',
    difficulty: 'advanced',
    content: '# Capstone: Professional RAG\nScalable, tested, and live in the cloud.',
    tasks: [{ id: 'c3', description: 'Deploy RAG with automated testing', completed: false }],
  },
  {
    id: 'cap-4',
    title: 'Capstone 4: AI Coding Agent Team',
    description: 'Create and maintain software projects automatically.',
    track: 'ai-coding',
    difficulty: 'advanced',
    content: '# Capstone: Auto-Dev Team\nBuild a team of agents that can write a whole app from a single prompt.',
    tasks: [{ id: 'c4', description: 'Complete auto-dev system', completed: false }],
  },
  {
    id: 'cap-5',
    title: 'Capstone 5: Full AI-Powered SaaS Product',
    description: 'Prompt engineering, agents, RAG, and automated deployment.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    content: '# Capstone: The AI SaaS\nThe ultimate challenge. Build a real business with AI.',
    tasks: [{ id: 'c5', description: 'Acquire first test user for your SaaS', completed: false }],
  },
  {
    id: 'cap-trading',
    title: 'Capstone: Real-time Trading Workstation',
    description: 'Live market data + AI Assistant.',
    track: 'ai-coding',
    difficulty: 'advanced',
    content: '# Capstone: Trading AI\nComplex real-time system with live data feeds.',
    tasks: [{ id: 'ct', description: 'Integrate market API and AI trading logic', completed: false }],
  }
];
