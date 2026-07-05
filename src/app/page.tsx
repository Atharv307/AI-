'use client';

import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Code, BookOpen, Layout, Play, Bot } from 'lucide-react';
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
  const { currentLessonId, setCurrentLesson, progress, setTargetJob, setSkillLevel } = useUserStore();
  const [view, setView] = useState<'workspace' | 'dashboard' | 'profile'>('workspace');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!progress.targetJob) {
      setShowOnboarding(true);
    }
  }, [progress.targetJob]);

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
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card border border-border/40 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Bot size={28} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome to AI Engineer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We'll help you go from zero to building production-ready AI agents. To personalize your journey, what's your current goal?
            </p>
            <div className="space-y-4">
              <Input
                placeholder="e.g. Become a High-Paid AI Engineer"
                className="bg-muted/30 border-border/40 h-12 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setTargetJob((e.target as HTMLInputElement).value);
                    setShowOnboarding(false);
                  }
                }}
              />
              <Button
                variant="primary"
                className="w-full h-12 rounded-xl text-md font-semibold"
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement;
                  if (input.value) {
                    setTargetJob(input.value);
                    setShowOnboarding(false);
                  }
                }}
              >
                Start Building
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Navigation Rail */}
      <div className="w-14 border-r border-border/40 flex flex-col items-center py-4 gap-4 bg-background">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <div className="w-4 h-4 rounded-sm bg-primary" />
        </div>
        <Button
          variant={view === 'workspace' ? 'secondary' : 'ghost'}
          size="icon"
          className="w-10 h-10 rounded-lg"
          onClick={() => setView('workspace')}
          title="Workspace"
        >
          <Code size={18} />
        </Button>
        <Button
          variant={view === 'dashboard' ? 'secondary' : 'ghost'}
          size="icon"
          className="w-10 h-10 rounded-lg"
          onClick={() => setView('dashboard')}
          title="Dashboard"
        >
          <Layout size={18} />
        </Button>
        <div className="mt-auto">
          <Button
            variant={view === 'profile' ? 'secondary' : 'ghost'}
            size="icon"
            className="w-10 h-10 rounded-lg"
            onClick={() => setView('profile')}
            title="Profile & Settings"
          >
            <UserCircle size={18} />
          </Button>
        </div>
      </div>

      {view === 'profile' ? (
        <div className="flex-1 overflow-auto bg-background">
          <div className="max-w-3xl mx-auto py-20 px-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                <UserCircle size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Account Settings</h1>
                <p className="text-muted-foreground text-sm">Personalize your learning journey and goals.</p>
              </div>
            </div>

            <div className="space-y-12">
              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Career Goal</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Target Job Role</label>
                  <Input
                    className="bg-card/30 border-border/40 focus:ring-1 focus:ring-primary/40 h-10 rounded-lg"
                    value={progress.targetJob || ''}
                    onChange={(e) => setTargetJob(e.target.value)}
                    placeholder="e.g. AI SaaS Founder, Junior AI Engineer"
                  />
                  <p className="text-[11px] text-muted-foreground italic">Your curriculum recommendations are prioritized based on this role.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Experience</h3>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground/80">Current Skill Level</label>
                  <div className="flex gap-3">
                    {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        className={`flex-1 py-3 px-4 rounded-xl border text-xs font-medium transition-all ${
                          progress.skillLevel === lvl
                            ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]'
                            : 'bg-card/20 border-border/40 text-muted-foreground hover:border-border hover:bg-card/40'
                        } capitalize`}
                        onClick={() => setSkillLevel(lvl as any)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <div className="pt-8 flex justify-end">
                <Button variant="primary" className="px-8 h-10 rounded-lg font-medium" onClick={() => setView('workspace')}>Save Changes</Button>
              </div>
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
      <div className="w-72 flex flex-col border-r border-border/40 bg-card/30">
        <Tabs defaultValue="lesson" className="flex-1 flex flex-col">
          <div className="px-3 py-3">
            <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-md">
              <TabsTrigger value="lesson" className="rounded-sm text-xs py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <BookOpen size={14} className="mr-2" /> Lesson
              </TabsTrigger>
              <TabsTrigger value="files" className="rounded-sm text-xs py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Code size={14} className="mr-2" /> Files
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
          <div className="flex items-center justify-between border-b border-border/40 px-4 h-12 bg-background">
            <TabsList className="h-12 bg-transparent border-none rounded-none">
              <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 h-12 text-xs font-medium">
                Editor
              </TabsTrigger>
              <TabsTrigger value="playground" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 h-12 text-xs font-medium">
                Playground
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="text-[10px] text-muted-foreground font-mono px-2 py-1 bg-muted/30 rounded border border-border/40">
                {selectedFile || 'No file open'}
              </div>
              <Button
                size="sm"
                variant="primary"
                className="h-7 text-xs px-3 rounded-md shadow-sm"
                disabled={!selectedFile}
                onClick={() => {
                  if (selectedFile) {
                    const cmd = selectedFile.endsWith('.py') ? `python3 "${selectedFile}"` : `cat "${selectedFile}"`;
                    handleRunCommand(cmd);
                  }
                }}
              >
                <Play size={12} className="mr-1.5 fill-current" /> Run
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
        <AIAssistant onActionExecute={async (actions) => {
          for (const action of actions) {
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
          }
        }} />
      </div>
        </>
      )}
    </div>
  );
}
