import { Lesson, UserProgress } from '@/types';
import { lessons } from '@/lib/curriculum/content';

export function getRecommendations(progress: UserProgress): Lesson[] {
  // Simple recommendation logic:
  // 1. Find the first lesson in the current track that isn't completed.
  // 2. If all in current track are completed, suggest first lesson of the next track.

  const completedSet = new Set(progress.completedLessons);
  const uncompleted = lessons.filter(l => !completedSet.has(l.id));

  if (uncompleted.length === 0) return [];

  // Sort by track priority or difficulty
  return uncompleted.slice(0, 2);
}

export function getRecommendedJobGoal(progress: UserProgress): string {
  if (progress.targetJob) return progress.targetJob;

  // Default recommendation based on skill level
  if (progress.skillLevel === 'beginner') return 'Junior AI Developer';
  return 'AI Solutions Architect';
}
