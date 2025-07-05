// Cycle Types
export enum CyclePhase {
  MENSTRUAL = 'menstrual',
  FOLLICULAR = 'follicular',
  OVULATORY = 'ovulatory',
  LUTEAL = 'luteal'
}

export interface PhaseInfo {
  name: CyclePhase;
  displayName: string;
  description: string;
  durationRange: [number, number]; // min and max days
  color: string;
}

export interface CycleDay {
  dayOfCycle: number;
  date: Date;
  phase: CyclePhase;
}

export interface CycleSettings {
  averageCycleLength: number;
  lastPeriodStartDate: Date;
  periodLength: number;
}

export interface UserCycle {
  id: string;
  settings: CycleSettings;
  currentCycleStartDate: Date;
  currentPhase: CyclePhase;
  currentCycleDay: number;
  predictedCycleDays: CycleDay[];
}

// Journal Types
export interface MoodEntry {
  mood: 'happy' | 'content' | 'neutral' | 'sad' | 'irritated' | 'anxious';
  intensity: 1 | 2 | 3 | 4 | 5;
}

export interface SymptomEntry {
  type: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: Date;
  mood?: MoodEntry;
  symptoms: SymptomEntry[];
  notes: string;
}

// Recommendations Types
export interface FoodRecommendation {
  name: string;
  description: string;
  benefits: string[];
  imageUrl?: string;
}

export interface ExerciseRecommendation {
  name: string;
  description: string;
  duration: string;
  intensity: 'light' | 'moderate' | 'intense';
  imageUrl?: string;
  videoUrl?: string;
  instructions: string[];
}

export interface MeditationRecommendation {
  name: string;
  description: string;
  duration: string;
  audioUrl?: string;
  instructions: string;
}

export interface PhaseRecommendations {
  phase: CyclePhase;
  foods: FoodRecommendation[];
  exercises: ExerciseRecommendation[];
  meditations: MeditationRecommendation[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  cycle: UserCycle;
  journalEntries: JournalEntry[];
}