'use client';

import React, { useState } from 'react';
import { Terminal as TerminalIcon, Code, BookOpen, Layout } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileExplorer } from '@/components/sandbox/FileExplorer';
import { CodeEditor } from '@/components/sandbox/CodeEditor';
import { Terminal } from '@/components/sandbox/Terminal';
import { LessonViewer } from '@/components/curriculum/LessonViewer';
import { AIAssistant } from '@/components/AIAssistant';
import { PromptPlayground } from '@/components/PromptPlayground';
import { lessons } from '@/lib/curriculum/content';

export default function WorkspacePage() {
  const [currentLesson] = useState(lessons[0]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState({ text: '', id: 0 });

  const handleFileSelect = async (path: string) => {
    try {
      const res = await fetch(`/api/workspace?action=read&path=${path}`);
      const data = await res.json();
      setSelectedFile(path);
      setFileContent(data.content);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  const handleRunCommand = async (command: string) => {
    try {
      const res = await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run', command })
      });
      const data = await res.json();
      setTerminalOutput({
        text: (data.stdout || '') + (data.stderr || ''),
        id: Date.now()
      });
    } catch (error) {
      console.error('Failed to run command:', error);
      setTerminalOutput({ text: 'Error: Failed to execute command', id: Date.now() });
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Curriculum & Files */}
      <div className="w-80 flex flex-col border-r">
        <Tabs defaultValue="lesson" className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lesson">
                <BookOpen size={16} className="mr-2" /> Lesson
              </TabsTrigger>
              <TabsTrigger value="files">
                <Code size={16} className="mr-2" /> Files
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="lesson" className="flex-1 m-0">
            <LessonViewer lesson={currentLesson} />
          </TabsContent>
          <TabsContent value="files" className="flex-1 m-0">
            <FileExplorer onFileSelect={handleFileSelect} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Area - Editor & Terminal / Playground */}
      <div className="flex-1 flex flex-col min-w-0">
        <Tabs defaultValue="editor" className="flex-1 flex flex-col">
          <div className="flex items-center justify-between border-b px-4 h-12 bg-muted/20">
            <TabsList className="h-8 bg-transparent border-none">
              <TabsTrigger value="editor" className="data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 h-8 text-xs">
                <Code size={14} className="mr-2" /> Editor
              </TabsTrigger>
              <TabsTrigger value="playground" className="data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 h-8 text-xs">
                <Layout size={14} className="mr-2" /> Prompt Playground
              </TabsTrigger>
            </TabsList>
            <div className="text-[10px] text-muted-foreground font-mono">
              {selectedFile || 'No file open'}
            </div>
          </div>

          <TabsContent value="editor" className="flex-1 m-0 flex flex-col min-h-0">
            <div className="flex-1 p-4">
              <CodeEditor
                content={fileContent}
                onChange={(val) => setFileContent(val || '')}
              />
            </div>

            <div className="h-64 border-t p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <TerminalIcon size={18} />
                <span className="text-sm font-medium">Terminal</span>
              </div>
              <div className="flex-1 bg-[#1e1e1e] rounded-md overflow-hidden">
                <Terminal onCommand={handleRunCommand} output={terminalOutput.text} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="playground" className="flex-1 m-0">
            <PromptPlayground />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar - AI Assistant */}
      <div className="w-96 flex flex-col">
        <AIAssistant onActionExecute={async (action) => {
          if (action.action === 'write_file') {
            await fetch('/api/workspace', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'write',
                path: action.parameters.path,
                content: action.parameters.content
              })
            });
            // Refresh file list if needed (omitted for brevity)
          } else if (action.action === 'run_command') {
            await handleRunCommand(action.parameters.command);
          }
        }} />
      </div>
    </div>
  );
}
