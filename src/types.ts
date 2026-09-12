export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  badge: string;
  status: string;
  iconType: 'tutor' | 'quiz' | 'coding' | 'path' | 'notes';
  badgeColor: string;
  iconBg: string;
}

export interface LearningModule {
  id: string;
  name: string;
  iconType: 'arrays' | 'strings' | 'linked-lists' | 'stacks' | 'queues' | 'trees' | 'graphs' | 'hash-tables' | 'heaps' | 'dp' | 'trie';
  progress: number;
  completed: boolean;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  topics: string[];
  keyIdea: string;
  codeSnippet: string;
}

export type NavRoute =
  | 'dashboard'
  | 'tutor'
  | 'quiz'
  | 'visualizer'
  | 'coding-lab'
  | 'learning-path'
  | 'ai-notes';

export interface UserStats {
  streakDays: number;
  xp: number;
  badgesCount: number;
  completedModulesCount: number;
  totalModulesCount: number;
}
