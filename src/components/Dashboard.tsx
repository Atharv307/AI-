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
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">Keep building to unlock more tracks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="text-primary" />
          <span className="font-medium">Goal: {progress.targetJob || 'AI Engineer'}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Progress value={(stat.value / stat.total) * 100} className="mt-2 h-1" />
              <p className="text-xs text-muted-foreground mt-2">
                {stat.total - stat.value} more to go
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map(lesson => (
                <div
                  key={lesson.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    if (onLessonSelect) onLessonSelect(lesson.id);
                  }}
                >
                  <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">{lesson.track}</div>
                  <div className="text-sm font-medium">{lesson.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{lesson.description}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">You've completed everything! Time for a Capstone.</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Skills Gained</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {progress.skills.length > 0 ? (
              progress.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No skills yet. Start your first lesson!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terminal Mastery</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {progress.commandsMastered.length > 0 ? (
              progress.commandsMastered.map(cmd => (
                <code key={cmd} className="text-xs bg-muted p-1 rounded font-mono">{cmd}</code>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">Master terminal commands through lessons.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
