
export enum EvaluationStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

export interface Department {
  id: string;
  name: string; // This will now represent "Evaluation Form Name" e.g., "ارزیابی مدیر انبار"
  lastEvaluationDate: string;
  status: EvaluationStatus;
  daysRemaining?: number;
  authorizedRoles: string[]; // List of roles allowed to see/evaluate this
}

export interface Criteria {
  id: string;
  category?: string;
  name: string;
  description: string;
  score: number;
  maxScore: number;
  feedback?: string;
}

export interface EvaluationTemplate {
  departmentId: string;
  departmentName: string;
  evaluateeName: string;
  evaluateeRole: string;
  evaluatorName: string;
  evaluatorRole: string;
  criteria: Criteria[];
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
  username: string;
}