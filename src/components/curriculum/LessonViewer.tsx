'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Lesson } from '@/types';

interface LessonViewerProps {
  lesson: Lesson;
}

export function LessonViewer({ lesson }: LessonViewerProps) {
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
              <Checkbox id={task.id} checked={task.completed} />
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
        </CardContent>
      </Card>
    </div>
  );
}
