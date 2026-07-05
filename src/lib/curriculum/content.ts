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
  // --- TRACK 1: PROMPT ENGINEERING ---
  {
    id: 'pe-1',
    title: 'Zero to Prompt Engineer',
    description: 'Understand how LLMs think and how to talk to them professionally.',
    track: 'prompt-engineering',
    difficulty: 'beginner',
    phases: [
      {
        id: 'theory',
        title: 'Conceptual Understanding',
        content: '# How do LLMs work?\nThink of an LLM like a super-powered autocomplete. It doesn\'t "know" things like humans do; it predicts the next most likely word.\n\n### Key Concepts:\n1. **Tokens**: Small chunks of text LLMs process.\n2. **Context Window**: How much information the AI can remember at once.\n3. **Prompt**: The instruction you give.',
        tasks: [{ id: 't1', description: 'Explain "Tokens" to the Assistant in your own words', completed: false }]
      },
      {
        id: 'building',
        title: 'The Build',
        content: '# Engineering the Prompt\nGo to the **Assistant** and ask it to explain a complex topic (like Quantum Physics) to a 5-year old.',
        tasks: [{ id: 'b1', description: 'Get a perfect ELI5 response from the Assistant', completed: false }]
      }
    ]
  },
  {
    id: 'pe-2',
    title: 'The Travel Agent Persona',
    description: 'Learn Persona Engineering to get specific, high-quality results.',
    track: 'prompt-engineering',
    difficulty: 'beginner',
    phases: [
      {
        id: 'planning',
        title: 'Persona Design',
        content: '# Why Personas?\nWithout a persona, AI is generic. With a persona, it becomes an expert.\n\n### Requirements:\n- Must act as a local expert for Tokyo.\n- Must use "Sushi Master" slang.\n- Must format output as a Markdown table.',
        tasks: [{ id: 'p1', description: 'Draft a system prompt for the "Sushi Master Tokyo Guide"', completed: false }]
      },
      {
        id: 'building',
        title: 'The Build',
        content: '# Test your Persona\nInput your system prompt and ask for a 1-day food tour.',
        tasks: [{ id: 'b1', description: 'Verify the output is in a Markdown table', completed: false }]
      }
    ]
  },
  {
    id: 'pe-3',
    title: 'Advanced Delimiters & Structured Output',
    description: 'Control the AI output using XML tags and JSON formatting.',
    track: 'prompt-engineering',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'The Power of Delimiters',
        content: 'Use `###`, `---`, or `<tag></tag>` to help the AI separate instructions from data.',
        tasks: [{ id: 't1', description: 'Read about XML-style prompting', completed: false }]
      },
      {
        id: 'building',
        title: 'Build a JSON Generator',
        content: 'Prompt the AI to summarize a news article and output the result ONLY in valid JSON.',
        tasks: [{ id: 'b1', description: 'Generate a JSON object with "title", "summary", and "sentiment" keys', completed: false }]
      }
    ]
  },
  {
    id: 'pe-4',
    title: 'Chain of Thought Reasoning',
    description: 'Teach the AI to think step-by-step for complex logic.',
    track: 'prompt-engineering',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'Let\'s Think Step by Step',
        content: 'Asking the AI to "think step by step" reduces hallucinations in math and logic problems.',
        tasks: [{ id: 't1', description: 'Read about Chain-of-Thought (CoT)', completed: false }]
      },
      {
        id: 'building',
        title: 'Solve a Logic Puzzle',
        content: 'Give the Assistant a complex riddle and require it to show its work before giving the answer.',
        tasks: [{ id: 'b1', description: 'Get a correctly reasoned answer to a logic puzzle', completed: false }]
      }
    ]
  },
  {
    id: 'pe-capstone',
    title: 'Capstone: The Automated PRD Generator',
    description: 'Build a complex prompt system that turns a "vibe" into a professional Product Requirements Document.',
    track: 'prompt-engineering',
    difficulty: 'advanced',
    phases: [
      {
        id: 'documentation',
        title: 'System Design',
        content: 'Your prompt needs to handle edge cases, technical stacks, and user stories.',
        tasks: [{ id: 'd1', description: 'Create a PRD_TEMPLATE.md in your workspace', completed: false }]
      },
      {
        id: 'building',
        title: 'Final Implementation',
        content: 'Create a "One-Prompt PRD Engine" that produces 2000+ words of documentation from a simple idea.',
        tasks: [{ id: 'b1', description: 'Generate a full PRD for a "Uber for Dogs" app', completed: false }]
      }
    ]
  },

  // --- TRACK 2: AI CODING ---
  {
    id: 'vc-1',
    title: 'Building a Personal Website',
    description: 'Use Vibe Coding to build your first site from scratch.',
    track: 'ai-coding',
    difficulty: 'beginner',
    phases: [
      {
        id: 'planning',
        title: 'Site Structure',
        content: 'Plan your Hero section, About me, and Projects list.',
        tasks: [{ id: 'p1', description: 'Write down your site structure in a plan.txt', completed: false }]
      },
      {
        id: 'building',
        title: 'The Build',
        content: 'Use the Assistant: "Build a modern responsive personal website using Tailwind CSS. Save it to index.html."',
        tasks: [{ id: 'b1', description: 'Generate and view your index.html', completed: false }]
      }
    ]
  },
  {
    id: 'vc-2',
    title: 'AI Digital Twin',
    description: 'Build a custom chatbot that knows everything about you.',
    track: 'ai-coding',
    difficulty: 'beginner',
    phases: [
      {
        id: 'documentation',
        title: 'Your Bio',
        content: 'Create a `bio.md` with your skills, history, and "vibe".',
        tasks: [{ id: 'd1', description: 'Write your professional bio', completed: false }]
      },
      {
        id: 'building',
        title: 'Connect the AI',
        content: 'Create a `twin.py` that uses the `ollama_client.py` to answer questions based on your bio.',
        tasks: [{ id: 'b1', description: 'Run twin.py and ask it "What is your greatest strength?"', completed: false }]
      }
    ]
  },
  {
    id: 'vc-3',
    title: 'Modern SaaS Landing Page',
    description: 'React, Tailwind, and Framer Motion integration with AI.',
    track: 'ai-coding',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'building',
        title: 'Component Library',
        content: 'Ask the AI to build a "Linear-inspired" component library for your SaaS.',
        tasks: [{ id: 'b1', description: 'Create Navbar, Hero, and Feature components', completed: false }]
      }
    ]
  },
  {
    id: 'vc-4',
    title: 'Refactoring Legacy Code',
    description: 'Use AI to modernize old JavaScript into clean TypeScript.',
    track: 'ai-coding',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'Modern Patterns',
        content: 'Learn about clean code principles and how AI can spot technical debt.',
        tasks: [{ id: 't1', description: 'Read about clean code', completed: false }]
      },
      {
        id: 'building',
        title: 'The Great Refactor',
        content: 'Paste a "messy" function into the Assistant and ask it to refactor for readability and performance.',
        tasks: [{ id: 'b1', description: 'Successfully refactor a complex function', completed: false }]
      }
    ]
  },
  {
    id: 'vc-capstone',
    title: 'Capstone: Full-Stack AI Project Manager',
    description: 'Build an app that tracks your projects and uses AI to suggest next steps.',
    track: 'ai-coding',
    difficulty: 'advanced',
    phases: [
      {
        id: 'documentation',
        title: 'Full Stack PRD',
        content: 'Define Frontend (Next.js), Backend (Node), and DB (Postgres/Supabase).',
        tasks: [{ id: 'd1', description: 'Complete a full-stack PRD', completed: false }]
      },
      {
        id: 'building',
        title: 'The Build',
        content: 'Work with the Assistant to build the entire stack, file by file.',
        tasks: [{ id: 'b1', description: 'Launch your project manager app locally', completed: false }]
      }
    ]
  },

  // --- TRACK 3: RAG SYSTEMS ---
  {
    id: 'rag-1',
    title: 'Knowledge Base Chatbot',
    description: 'Introduction to Retrieval Augmented Generation.',
    track: 'rag-systems',
    difficulty: 'beginner',
    phases: [
      {
        id: 'theory',
        title: 'RAG Fundamentals',
        content: 'RAG = Retrieval (find relevant info) + Generation (write the answer).',
        tasks: [{ id: 't1', description: 'Read the RAG workflow overview', completed: false }]
      },
      {
        id: 'building',
        title: 'The "Search" Build',
        content: 'Create a simple Python script that searches a text file for a keyword.',
        tasks: [{ id: 'b1', description: 'Implement keyword-based retrieval', completed: false }]
      }
    ]
  },
  {
    id: 'rag-2',
    title: 'Vector Search Deep-Dive',
    description: 'Move from keywords to "Meaning" using embeddings.',
    track: 'rag-systems',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'What are Embeddings?',
        content: 'Embeddings turn words into numbers (vectors). Similar meanings have similar numbers.',
        tasks: [{ id: 't1', description: 'Read about Vector Math', completed: false }]
      },
      {
        id: 'building',
        title: 'Vector Store Setup',
        content: 'Use `SimpleVectorStore` from `ollama_client.py` to index 10 sentences.',
        tasks: [{ id: 'b1', description: 'Successfully perform a semantic search', completed: false }]
      }
    ]
  },
  {
    id: 'rag-3',
    title: 'PDF Analyzer',
    description: 'Extract and chat with data from complex PDF documents.',
    track: 'rag-systems',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'building',
        title: 'The Parser',
        content: 'Write a script to parse text from a PDF and feed it into your RAG system.',
        tasks: [{ id: 'b1', description: 'Chat with a 10-page PDF document', completed: false }]
      }
    ]
  },
  {
    id: 'rag-capstone',
    title: 'Capstone: Personal Second Brain AI',
    description: 'Build a system that syncs with your notes and provides intelligent insights.',
    track: 'rag-systems',
    difficulty: 'advanced',
    phases: [
      {
        id: 'planning',
        title: 'Architecture',
        content: 'Design a system that handles hundreds of documents efficiently.',
        tasks: [{ id: 'p1', description: 'Create an architecture diagram for your Second Brain', completed: false }]
      },
      {
        id: 'building',
        title: 'Final Build',
        content: 'Build the full RAG pipeline with hybrid search and re-ranking.',
        tasks: [{ id: 'b1', description: 'Demonstrate the AI recalling a specific note from 1 month ago', completed: false }]
      }
    ]
  },

  // --- TRACK 4: AGENTIC AI ---
  {
    id: 'ag-1',
    title: 'Autonomous Web Researcher',
    description: 'Build an agent that can browse the web to find information.',
    track: 'agentic-ai',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'Agent Loops',
        content: 'Agents use a "Reason -> Act -> Observe" loop to complete tasks.',
        tasks: [{ id: 't1', description: 'Read about the ReAct pattern', completed: false }]
      },
      {
        id: 'building',
        title: 'The Researcher',
        content: 'Create a script that uses a search tool to find the latest AI news.',
        tasks: [{ id: 'b1', description: 'Have your agent summarize 3 news articles', completed: false }]
      }
    ]
  },
  {
    id: 'ag-2',
    title: 'Multi-Agent Debate System',
    description: 'Watch two AIs argue to find the truth.',
    track: 'agentic-ai',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'building',
        title: 'The Debate',
        content: 'Set up two agents: "The Optimist" and "The Skeptic". Give them a topic like "The future of AGI".',
        tasks: [{ id: 'b1', description: 'Run a 5-turn debate between your agents', completed: false }]
      }
    ]
  },
  {
    id: 'ag-3',
    title: 'AI Customer Support Agent',
    description: 'Give your AI "Tools" to look up order status and handle refunds.',
    track: 'agentic-ai',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'Tool Use (Function Calling)',
        content: 'How AIs use external APIs to get real-world work done.',
        tasks: [{ id: 't1', description: 'Read about Tool Definition', completed: false }]
      },
      {
        id: 'building',
        title: 'The Support Bot',
        content: 'Create an agent that can "cancel" a fake order in a local JSON database.',
        tasks: [{ id: 'b1', description: 'Successfully handle a cancellation request using a tool', completed: false }]
      }
    ]
  },
  {
    id: 'ag-capstone',
    title: 'Capstone: The AI Coding Agency',
    description: 'Build a team of agents (Manager, Coder, Reviewer) that builds apps autonomously.',
    track: 'agentic-ai',
    difficulty: 'advanced',
    phases: [
      {
        id: 'documentation',
        title: 'Agent Orchestration',
        content: 'Design how your agents communicate with each other.',
        tasks: [{ id: 'd1', description: 'Write an "Agent Hand-off" protocol', completed: false }]
      },
      {
        id: 'building',
        title: 'The Full Build',
        content: 'Build the agency and have them generate a "Todo List" app together.',
        tasks: [{ id: 'b1', description: 'Review the code generated by your autonomous team', completed: false }]
      }
    ]
  },

  // --- TRACK 5: SYSTEMS THINKING ---
  {
    id: 'st-1',
    title: 'Architecting for Scale',
    description: 'Learn to design AI apps that don\'t break.',
    track: 'systems-thinking',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'Reliability & Latency',
        content: 'How to handle slow AI responses and server timeouts.',
        tasks: [{ id: 't1', description: 'Read about Async AI processing', completed: false }]
      }
    ]
  },
  {
    id: 'st-2',
    title: 'Database Design with AI',
    description: 'SQL vs NoSQL for AI applications.',
    track: 'systems-thinking',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'building',
        title: 'The DB Build',
        content: 'Use AI to generate a complex database schema for a social media app.',
        tasks: [{ id: 'b1', description: 'Create a schema.sql file', completed: false }]
      }
    ]
  },
  {
    id: 'st-capstone',
    title: 'Capstone: Distributed AI System Design',
    description: 'Design a system that uses multiple models (local and cloud) for cost-efficiency.',
    track: 'systems-thinking',
    difficulty: 'advanced',
    phases: [
      {
        id: 'planning',
        title: 'Model Routing',
        content: 'Determine when to use a cheap local model vs an expensive cloud model.',
        tasks: [{ id: 'p1', description: 'Write a routing logic plan', completed: false }]
      }
    ]
  },

  // --- TRACK 6: MLOPS ---
  {
    id: 'ml-1',
    title: 'LLM Evaluation & Testing',
    description: 'How do you know if your AI is actually good?',
    track: 'mlops',
    difficulty: 'intermediate',
    phases: [
      {
        id: 'theory',
        title: 'The Eval Framework',
        content: 'Learn about ROUGE, BLEU, and LLM-as-a-judge.',
        tasks: [{ id: 't1', description: 'Read about AI Evaluation metrics', completed: false }]
      }
    ]
  },
  {
    id: 'ml-2',
    title: 'Deploying Ollama to Production',
    description: 'Dockerize and host your own AI brain.',
    track: 'mlops',
    difficulty: 'advanced',
    phases: [
      {
        id: 'building',
        title: 'Docker Build',
        content: 'Create a Dockerfile that starts an Ollama server and pre-loads a model.',
        tasks: [{ id: 'b1', description: 'Successfully build the Ollama Docker image', completed: false }]
      }
    ]
  },
  {
    id: 'ml-capstone',
    title: 'Capstone: The Production-Ready AI Startup',
    description: 'From zero to a monitored, scalable, and tested AI SaaS.',
    track: 'mlops',
    difficulty: 'advanced',
    phases: [
      {
        id: 'documentation',
        title: 'Production Roadmap',
        content: 'Plan CI/CD, Monitoring, and User Authentication.',
        tasks: [{ id: 'd1', description: 'Finalize your Startup Launch PRD', completed: false }]
      },
      {
        id: 'building',
        title: 'The Launch',
        content: 'Deploy your final project and verify monitoring is working.',
        tasks: [{ id: 'b1', description: 'Confirm your app is live and reachable', completed: false }]
      }
    ]
  }
];
