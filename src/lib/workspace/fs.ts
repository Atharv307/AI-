import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const WORKSPACE_ROOT = path.resolve(process.cwd(), 'workspace');

function sanitizePath(filePath: string) {
  const fullPath = path.resolve(WORKSPACE_ROOT, filePath);
  if (!fullPath.startsWith(WORKSPACE_ROOT)) {
    throw new Error('Access denied: Path is outside of workspace');
  }
  return fullPath;
}

export async function ensureWorkspace() {
  await fs.mkdir(WORKSPACE_ROOT, { recursive: true });
  // Initial seed files if empty
  const files = await fs.readdir(WORKSPACE_ROOT);
  if (files.length <= 1) {
    await fs.writeFile(path.join(WORKSPACE_ROOT, 'hello_ai.py'), 'print("Welcome to AI Engineering!")', 'utf-8');

    // Create the Ollama helper for learner projects
    const helperContent = `import requests
import json
import os

class OllamaClient:
    def __init__(self, model="qwen2.5:1.5b", base_url="http://localhost:11434"):
        self.model = model
        self.base_url = base_url

    def chat(self, prompt, system="You are a helpful assistant."):
        url = f"{self.base_url}/api/chat"
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": prompt}
            ],
            "stream": False
        }
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            return response.json()["message"]["content"]
        except Exception as e:
            return f"Error: {str(e)}"

class SimpleVectorStore:
    """A beginner-friendly vector store mock that uses simple string matching."""
    def __init__(self):
        self.documents = []

    def add_document(self, text, metadata=None):
        self.documents.append({"text": text, "metadata": metadata or {}})

    def search(self, query, k=2):
        # Basic keyword-based similarity for learning purposes
        query_words = set(query.lower().split())
        results = []
        for doc in self.documents:
            doc_words = set(doc["text"].lower().split())
            score = len(query_words.intersection(doc_words))
            results.append((score, doc))

        results.sort(key=lambda x: x[0], reverse=True)
        return [r[1] for r in results[:k]]

def chat_with_llm(prompt, model="qwen2.5:1.5b"):
    url = "http://localhost:11434/api/chat"
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["message"]["content"]
    except Exception as e:
        return f"Error connecting to local LLM: {str(e)}"

if __name__ == "__main__":
    test_prompt = "What is AI Engineering in one sentence?"
    print(f"Prompt: {test_prompt}")
    print(f"Response: {chat_with_llm(test_prompt)}")
`;
    await fs.writeFile(path.join(WORKSPACE_ROOT, 'ollama_client.py'), helperContent, 'utf-8');
    await fs.writeFile(path.join(WORKSPACE_ROOT, 'requirements.txt'), 'requests\n', 'utf-8');

    // Seed templates
    await fs.writeFile(path.join(WORKSPACE_ROOT, 'PRD_TEMPLATE.md'), `# Project Name: [Title]
## Overview
What are we building and why?

## Core Features
1. [Feature 1]
2. [Feature 2]

## Success Criteria
How do we know it works?`, 'utf-8');

    await fs.writeFile(path.join(WORKSPACE_ROOT, 'AGENTS_TEMPLATE.md'), `# AI Agent Architecture
## Agent Roles
- **[Agent Name]**: [Responsibility]

## Knowledge Base
- [Sources of data]

## Tools
- [Terminal, API, etc]`, 'utf-8');
  }
}

export async function writeFile(filePath: string, content: string) {
  const fullPath = sanitizePath(filePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content, 'utf-8');
}

export async function readFile(filePath: string) {
  const fullPath = sanitizePath(filePath);
  return await fs.readFile(fullPath, 'utf-8');
}

export async function listFiles(dirPath: string = '.') {
  const fullPath = sanitizePath(dirPath);
  const entries = await fs.readdir(fullPath, { withFileTypes: true });
  return entries.map(entry => ({
    name: entry.name,
    isDirectory: entry.isDirectory(),
    path: path.join(dirPath, entry.name)
  }));
}

export async function runCommand(command: string) {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: WORKSPACE_ROOT });
    return { stdout, stderr, success: true };
  } catch (error: any) {
    return {
      stdout: error.stdout,
      stderr: error.stderr || error.message,
      success: false
    };
  }
}
