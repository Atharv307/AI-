export interface Lesson {
  id: string;
  title: string;
  description: string;
  track: TrackId;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string; // Markdown
  tasks: Task[];
  initialFiles?: Record<string, string>;
}

export type TrackId =
  | 'prompt-engineering'
  | 'ai-coding'
  | 'rag-systems'
  | 'agentic-ai'
  | 'systems-thinking'
  | 'mlops';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  hint?: string;
}

export interface UserProgress {
  completedLessons: string[];
  completedProjects: string[];
  currentLessonId?: string;
  skills: string[];
  commandsMastered: string[];
  targetJob?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface Track {
  id: TrackId;
  title: string;
  description: string;
  icon: string;
}
