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

  const allTasksDone = lesson.tasks.every(t => taskStatus[t.id]);
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
      <div className="flex items-center justify-between">
        <div className="prose dark:prose-invert max-w-none flex-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed"
        disabled={isInitializing}
        onClick={handleInitialize}
      >
        {isInitializing ? 'Initializing Project...' : 'Initialize Starter Files'}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-3">
              <Checkbox
                id={task.id}
                checked={taskStatus[task.id] || false}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={task.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task.description}
                </label>
                {task.hint && (
                  <p className="text-xs text-muted-foreground">{task.hint}</p>
                )}
              </div>
            </div>
          ))}

          {allTasksDone && !isCompleted && (
            <Button
              className="w-full mt-4"
              onClick={() => completeLesson(lesson.id)}
            >
              Complete Lesson
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
