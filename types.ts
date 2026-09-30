
export enum Subject {
  Accounting = 'Accounting',
  AgriculturalScience = 'Agricultural Science',
  Arabic = 'Arabic Language',
  Astronomy = 'Astronomy',
  BankingAndFinance = 'Banking and Finance',
  Biology = 'Biology',
  BusinessAdministration = 'Business Administration',
  BusinessEducation = 'Business Education',
  BusinessStudies = 'Business Studies',
  Chemistry = 'Chemistry',
  ChristianReligiousStudies = 'Christian Religious Studies',
  CivicEducation = 'Civic Education',
  Coding = 'Coding',
  Commerce = 'Commerce',
  ComputerScience = 'Computer Science',
  DatabaseManagement = 'Database Management',
  DemographyAndSocialStatistics = 'Demography and Social Statistics',
  Economics = 'Economics',
  EconomicsEducation = 'Economics Education',
  Edo = 'Edo Language',
  English = 'English',
  EnglishLanguage = 'English Language',
  EnvironmentalManagement = 'Environmental Management',
  FinancialAccounting = 'Financial Accounting',
  French = 'French Language',
  FurtherMathematics = 'Further Mathematics',
  GeneralScience = 'General Science',
  Geography = 'Geography',
  Government = 'Government',
  Greek = 'Greek Language',
  Hausa = 'Hausa Language',
  HealthEducation = 'Health Education',
  Hebrew = 'Hebrew Language',
  History = 'History',
  HomeEconomics = 'Home Economics',
  Igbo = 'Igbo Language',
  Law = 'Law',
  LiteratureInEnglish = 'Literature in English',
  ManagementAccounting = 'Management Accounting',
  Marketing = 'Marketing',
  Math = 'Mathematics',
  Medicine = 'Medicine and Surgery',
  Mechatronics = 'Mechatronics',
  Music = 'Music',
  Nursing = 'Nursing',
  PeaceStudies = 'Peace Studies',
  Philosophy = 'Philosophy',
  PhysicalEducation = 'Physical Education',
  Physics = 'Physics',
  Physiotherapy = 'Physiotherapy',
  PoliticalScience = 'Political Science',
  Portuguese = 'Portuguese Language',
  Psychology = 'Psychology',
  SocialStudies = 'Social Studies',
  Sociology = 'Sociology',
  SoftwareEngineering = 'Software Engineering',
  Statistics = 'Statistics',
  TechnicalDrawing = 'Technical Drawing',
  Theology = 'Theology',
  TransportAndOperationalManagement = 'Transport and Operational Management',
  Yoruba = 'Yoruba Language',
  Zoology = 'Zoology',
}

export const ALL_SUBJECTS: Subject[] = Array.from(new Set(Object.values(Subject)));

export enum AudienceLevel {
  Child = 'Simple (for a child)',
  HighSchool = 'High School (O/A-Level)',
  University = 'University (Advanced)',
  Expert = 'Expert (Post-Graduate)',
}

export interface HistoryItem {
  id: string;
  subject: Subject;
  audienceLevel: AudienceLevel;
  prompt: string;
  solution: SolutionType;
  timestamp: number;
}

export interface ImagePart {
  inlineData: {
    mimeType: string;
    data: string;
  };
}

export type ContentPart =
  | { type: 'text'; content: string }
  | { type: 'image'; content: string; alt: string };

export type SolutionType = ContentPart[];

export interface User {
  email: string;
  fullName?: string;
  isAdmin: boolean;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
  createdAt?: number;
  lastLoginAt?: number;
  loginCount?: number;
  isOnline?: boolean;
  lastActiveAt?: number;
}

export interface ActiveSession {
  sessionId: string;
  email: string;
  fullName?: string;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
  loginTime: number;
  lastActiveTime: number;
  userAgent?: string;
  ip?: string;
  isOnline: boolean;
}

export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  quizTitle: string;
  questions: QuizQuestion[];
}

export interface Score {
  id: string;
  email: string;
  score: number;
  totalQuestions: number;
  subject: Subject;
  level: AudienceLevel;
  timestamp: number;
}

export interface Announcement {
  id: string;
  content: string;
  timestamp: number;
}
