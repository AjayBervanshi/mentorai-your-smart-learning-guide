export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type UserGoal = "job" | "freelance" | "growth";
export type DailyTime = 15 | 30 | 60;

export interface UserSkill {
  id: string;
  name: string;
  level: SkillLevel;
  progress: number; // 0-100
  currentTopicIndex: number;
  weakTopics: string[];
  completedTopics: string[];
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  level: SkillLevel;
  completed: boolean;
  score?: number;
  subtopics: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  skills: UserSkill[];
  goal: UserGoal;
  dailyTime: DailyTime;
  streak: number;
  totalXP: number;
  joinedDate: string;
  lastActive: string;
}

export interface AppState {
  users: UserProfile[];
  activeUserId: string | null;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface Project {
  id: string;
  skillId: string;
  title: string;
  description: string;
  difficulty: SkillLevel;
  completed: boolean;
}

export interface InterviewQuestion {
  id: string;
  skillId: string;
  question: string;
  sampleAnswer: string;
  tips: string[];
}
