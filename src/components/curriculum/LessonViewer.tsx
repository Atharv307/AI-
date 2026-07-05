'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  const allTasksDone = lesson.tasks.every(t => taskStatus[t.id]);
  const isCompleted = progress.completedLessons.includes(lesson.id);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {lesson.content}
        </ReactMarkdown>
      </div>

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
    </div>
  );
}
