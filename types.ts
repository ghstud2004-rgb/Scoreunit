
export enum EvaluationStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

export interface Department {
  id: string;
  name: string;
  lastEvaluationDate: string;
  status: EvaluationStatus;
  daysRemaining?: number;
}

export interface Criteria {
  id: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
  feedback?: string;
}

export interface EvaluationRecord {
  id: string;
  personName: string;
  departmentName: string;
  evaluatorName: string;
  date: string;
  criteria: Criteria[];
  totalScore: number;
  maxTotalScore: number;
  achievementPercentage: number;
  level: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}
