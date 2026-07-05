'use client';

import React from 'react';
import { Trophy, Book, Terminal, Cpu, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/store/userStore';
import { getRecommendations } from '@/lib/curriculum/recommendations';

interface DashboardProps {
  onLessonSelect?: (lessonId: string) => void;
}

export function Dashboard({ onLessonSelect }: DashboardProps) {
  const { progress } = useUserStore();
  const recommendations = getRecommendations(progress);

  const stats = [
    { label: 'Lessons Done', value: progress.completedLessons.length, total: 30, icon: Book, color: 'text-blue-500' },
    { label: 'Projects Built', value: progress.completedProjects.length, total: 20, icon: Cpu, color: 'text-purple-500' },
    { label: 'Commands', value: progress.commandsMastered.length, total: 50, icon: Terminal, color: 'text-green-500' },
    { label: 'Skills', value: progress.skills.length, total: 15, icon: Trophy, color: 'text-yellow-500' },
  ];

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-border/40 pb-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-2">Track your journey to becoming an AI Engineer.</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="text-primary" />
          <span className="font-medium">Goal: {progress.targetJob || 'AI Engineer'}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-card/40 border border-border/40 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="text-3xl font-semibold mb-2">{stat.value}</div>
            <Progress value={(stat.value / stat.total) * 100} className="h-1 bg-muted/30" />
          </div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">What's Next?</h3>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map(lesson => (
                <div
                  key={lesson.id}
                  className="p-4 rounded-xl bg-card/30 border border-border/40 hover:border-primary/40 hover:bg-card/50 cursor-pointer transition-all group"
                  onClick={() => {
                    if (onLessonSelect) onLessonSelect(lesson.id);
                  }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-1 group-hover:text-primary transition-colors">{lesson.track}</div>
                  <div className="text-sm font-semibold mb-1">{lesson.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{lesson.description}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic px-1">Everything complete! Start a Capstone.</p>
            )}
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Skills Gained</h3>
          <div className="flex flex-wrap gap-2">
            {progress.skills.length > 0 ? (
              progress.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-primary/5 border-primary/20 text-primary-foreground/90 rounded-md py-1">{skill}</Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic px-1">No skills yet.</p>
            )}
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Terminal Mastery</h3>
          <div className="flex flex-wrap gap-2">
            {progress.commandsMastered.length > 0 ? (
              progress.commandsMastered.map(cmd => (
                <code key={cmd} className="text-[10px] bg-muted/40 border border-border/40 px-1.5 py-0.5 rounded text-muted-foreground font-mono">{cmd}</code>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic px-1">Master commands in lessons.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
