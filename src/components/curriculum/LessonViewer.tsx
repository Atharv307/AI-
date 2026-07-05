'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Terminal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/types';
import { useUserStore } from '@/store/userStore';

interface LessonViewerProps {
  lesson: Lesson;
}

export function LessonViewer({ lesson }: LessonViewerProps) {
  const { taskStatus, toggleTask, completeLesson, progress } = useUserStore();
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [activePhaseIndex, setActivePhaseIndex] = React.useState(0);

  const currentPhase = lesson.phases[activePhaseIndex];
  const allTasksDoneInPhase = currentPhase.tasks.every(t => taskStatus[t.id]);
  const isLastPhase = activePhaseIndex === lesson.phases.length - 1;
  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `I am starting the lesson: ${lesson.title}. Please initialize the folder structure and starter files for this project in the workspace.`,
          history: []
        })
      });
      // This will trigger the assistant to use its actions
      // and the workspace will refresh automatically
    } catch (error) {
      console.error('Failed to initialize lesson:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 space-y-6">
      {/* Workflow Stepper */}
      <div className="flex items-center gap-1 mb-2">
        {lesson.phases.map((phase, idx) => (
          <div
            key={phase.id}
            className={`h-1 flex-1 rounded-full transition-colors ${
              idx <= activePhaseIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Phase {activePhaseIndex + 1}: {currentPhase.id}
          </span>
          <h2 className="text-xl font-semibold tracking-tight">{currentPhase.title}</h2>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {currentPhase.content}
        </ReactMarkdown>
      </div>

      {currentPhase.id === 'building' && (
        <Button
          variant="outline"
          className="w-full border-dashed h-9 text-xs"
          disabled={isInitializing}
          onClick={handleInitialize}
        >
          {isInitializing ? 'Initializing Project...' : 'Initialize Starter Files'}
        </Button>
      )}

      <Card className="bg-muted/30 border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentPhase.tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-3">
              <Checkbox
                id={task.id}
                checked={taskStatus[task.id] || false}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={task.id}
                  className="text-sm font-medium leading-none"
                >
                  {task.description}
                </label>
              </div>
            </div>
          ))}

          {allTasksDoneInPhase && !isLastPhase && (
            <Button
              className="w-full mt-4 h-9 font-semibold"
              onClick={() => setActivePhaseIndex(prev => prev + 1)}
            >
              Next Phase →
            </Button>
          )}

          {allTasksDoneInPhase && isLastPhase && !isCompleted && (
            <Button
              className="w-full mt-4 h-9 font-semibold"
              onClick={() => completeLesson(lesson.id)}
            >
              Finish Lesson & Project
            </Button>
          )}
          {isCompleted && (
            <div className="text-center text-sm text-green-600 font-medium bg-green-50 p-2 rounded border border-green-200">
              ✓ Lesson Completed
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resources</h3>
        <div className="space-y-2">
          <a href="https://ollama.com/library/qwen2.5:1.5b" target="_blank" className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/20 hover:bg-card/40 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-primary/10 text-primary">
                <Terminal size={14} />
              </div>
              <span className="text-xs font-medium">Qwen 2.5 Model Card</span>
            </div>
            <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>
      </section>
    </div>
  );
}
