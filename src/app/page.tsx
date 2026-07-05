'use client';

import React, { useState } from 'react';
import { Terminal as TerminalIcon, Code, BookOpen, Layout, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileExplorer } from '@/components/sandbox/FileExplorer';
import { CodeEditor } from '@/components/sandbox/CodeEditor';
import { Terminal } from '@/components/sandbox/Terminal';
import { LessonViewer } from '@/components/curriculum/LessonViewer';
import { AIAssistant } from '@/components/AIAssistant';
import { PromptPlayground } from '@/components/PromptPlayground';
import { Dashboard } from '@/components/Dashboard';
import { lessons } from '@/lib/curriculum/content';
import { useUserStore } from '@/store/userStore';
import { Settings, UserCircle } from 'lucide-react';

export default function WorkspacePage() {
  const { currentLessonId, setCurrentLesson, progress, setTargetJob } = useUserStore();
  const [view, setView] = useState<'workspace' | 'dashboard' | 'profile'>('workspace');

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState({ text: '', id: 0 });
  const [refreshFilesKey, setRefreshFilesKey] = useState(0);

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
      {/* Navigation Rail */}
      <div className="w-16 border-r flex flex-col items-center py-4 gap-4 bg-muted/20">
        <Button
          variant={view === 'workspace' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setView('workspace')}
          title="Workspace"
        >
          <Code size={20} />
        </Button>
        <Button
          variant={view === 'dashboard' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setView('dashboard')}
          title="Dashboard"
        >
          <Layout size={20} />
        </Button>
        <div className="mt-auto">
          <Button
            variant={view === 'profile' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setView('profile')}
            title="Profile & Settings"
          >
            <UserCircle size={20} />
          </Button>
        </div>
      </div>

      {view === 'profile' ? (
        <div className="flex-1 overflow-auto p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Job Role</label>
              <Input
                value={progress.targetJob || ''}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g. AI SaaS Founder, Junior AI Engineer"
              />
              <p className="text-xs text-muted-foreground">We'll tailor your recommendations based on this goal.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Level</label>
              <div className="flex gap-2">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <Button
                    key={lvl}
                    variant={progress.skillLevel === lvl ? 'default' : 'outline'}
                    size="sm"
                    className="capitalize"
                    onClick={() => useUserStore.setState({ progress: { ...progress, skillLevel: lvl as any } })}
                  >
                    {lvl}
                  </Button>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <Button onClick={() => setView('workspace')}>Save and Continue</Button>
            </div>
          </div>
        </div>
      ) : view === 'dashboard' ? (
        <div className="flex-1 overflow-auto">
          <Dashboard onLessonSelect={(lessonId) => {
            setCurrentLesson(lessonId);
            setView('workspace');
          }} />
        </div>
      ) : (
        <>
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
            <FileExplorer
              onFileSelect={handleFileSelect}
              refreshKey={refreshFilesKey}
            />
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
            <div className="flex items-center gap-4">
              <div className="text-[10px] text-muted-foreground font-mono">
                {selectedFile || 'No file open'}
              </div>
              <Button
                size="sm"
                variant="default"
                className="h-7 text-xs px-3"
                disabled={!selectedFile}
                onClick={() => selectedFile && handleRunCommand(`python3 ${selectedFile}`)}
              >
                <Play size={14} className="mr-2" /> Run
              </Button>
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
                <Terminal onCommand={handleRunCommand} output={terminalOutput} />
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
            setRefreshFilesKey(k => k + 1);
          } else if (action.action === 'run_command') {
            await handleRunCommand(action.parameters.command);
          }
        }} />
      </div>
        </>
      )}
    </div>
  );
}
