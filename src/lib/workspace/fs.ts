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
  if (files.length === 0) {
    await fs.writeFile(path.join(WORKSPACE_ROOT, 'hello_ai.py'), 'print("Welcome to AI Engineering!")', 'utf-8');
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
