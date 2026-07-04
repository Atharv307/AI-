'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '@/types';

interface UserStore {
  progress: UserProgress;
  completeLesson: (lessonId: string) => void;
  addSkill: (skill: string) => void;
  addCommand: (command: string) => void;
  setTargetJob: (job: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      progress: {
        completedLessons: [],
        completedProjects: [],
        skills: [],
        commandsMastered: [],
        skillLevel: 'beginner',
      },
      completeLesson: (lessonId) => set((state) => ({
        progress: {
          ...state.progress,
          completedLessons: [...new Set([...state.progress.completedLessons, lessonId])]
        }
      })),
      addSkill: (skill) => set((state) => ({
        progress: {
          ...state.progress,
          skills: [...new Set([...state.progress.skills, skill])]
        }
      })),
      addCommand: (command) => set((state) => ({
        progress: {
          ...state.progress,
          commandsMastered: [...new Set([...state.progress.commandsMastered, command])]
        }
      })),
      setTargetJob: (job) => set((state) => ({
        progress: {
          ...state.progress,
          targetJob: job
        }
      })),
    }),
    {
      name: 'ai-engineer-progress',
    }
  )
);
