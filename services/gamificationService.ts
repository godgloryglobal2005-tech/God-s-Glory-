import { Subject, AudienceLevel } from '../types';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'quiz' | 'study' | 'streak' | 'mastery' | 'general';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: number;
}

export interface UserProgress {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalStudyTimeMinutes: number;
  problemsSolved: number;
  videosWatched: number;
  subjectsStudied: string[];
  unlockedBadgeIds: string[];
  xp: number;
  level: number;
}

const STORAGE_KEY = 'gods_glory_user_progress_v1';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_step',
    name: "Scholar's Genesis",
    description: 'Began your academic journey with God\'s Glory Tutors.',
    icon: '🌱',
    category: 'general',
    tier: 'bronze',
  },
  {
    id: 'problem_solver_5',
    name: 'Analytical Mind',
    description: 'Submitted 5 academic inquiries and solved step-by-step solutions.',
    icon: '💡',
    category: 'study',
    tier: 'bronze',
  },
  {
    id: 'quiz_starter',
    name: 'Quiz Explorer',
    description: 'Completed your very first interactive knowledge quiz.',
    icon: '🎯',
    category: 'quiz',
    tier: 'bronze',
  },
  {
    id: 'quiz_ace',
    name: 'Sharpshooter Ace',
    description: 'Achieved a perfect 100% score on an academic quiz.',
    icon: '🏹',
    category: 'quiz',
    tier: 'gold',
  },
  {
    id: 'quiz_veteran',
    name: 'Quiz Centurion',
    description: 'Answered 25 or more quiz questions across subjects.',
    icon: '🛡️',
    category: 'quiz',
    tier: 'silver',
  },
  {
    id: 'quiz_grandmaster',
    name: 'Grand Quiz Laureate',
    description: 'Answered 50 or more quiz questions in a single or combined session.',
    icon: '👑',
    category: 'quiz',
    tier: 'platinum',
  },
  {
    id: 'timer_novice',
    name: 'Time Keeper',
    description: 'Completed at least 10 minutes on the dedicated Study Timer.',
    icon: '⏳',
    category: 'study',
    tier: 'bronze',
  },
  {
    id: 'deep_focus',
    name: 'Zen Academic Focus',
    description: 'Completed a maximum 30-minute deep study session without interruptions.',
    icon: '🧘',
    category: 'study',
    tier: 'gold',
  },
  {
    id: 'study_marathon',
    name: 'Master of Hours',
    description: 'Accumulated over 60 minutes of total focused study time.',
    icon: '🕰️',
    category: 'study',
    tier: 'platinum',
  },
  {
    id: 'streak_3',
    name: 'Steady Flame',
    description: 'Maintained a continuous 3-day learning streak.',
    icon: '🔥',
    category: 'streak',
    tier: 'silver',
  },
  {
    id: 'streak_7',
    name: 'Academic Titan',
    description: 'Maintained a continuous 7-day learning streak.',
    icon: '⚡',
    category: 'streak',
    tier: 'gold',
  },
  {
    id: 'polymath',
    name: 'Universal Polymath',
    description: 'Explored curriculum topics across 4 or more distinct disciplines.',
    icon: '🌐',
    category: 'mastery',
    tier: 'gold',
  },
  {
    id: 'stem_master',
    name: 'STEM Pioneer',
    description: 'Solved questions or quizzes in Mathematics, Physics, and Chemistry.',
    icon: '🔬',
    category: 'mastery',
    tier: 'silver',
  },
  {
    id: 'video_enthusiast',
    name: 'Visual Learner',
    description: 'Watched or animated 3 topic video lessons or whiteboard stitches.',
    icon: '🎬',
    category: 'study',
    tier: 'bronze',
  },
  {
    id: 'high_accuracy',
    name: 'Precision Scholar',
    description: 'Maintained over 80% quiz accuracy with at least 15 questions answered.',
    icon: '🎖️',
    category: 'quiz',
    tier: 'gold',
  },
  {
    id: 'valedictorian',
    name: "God's Glory Valedictorian",
    description: 'Reached Level 5 with over 500 total XP earned.',
    icon: '🏆',
    category: 'general',
    tier: 'platinum',
  }
];

const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const calculateLevel = (xp: number): number => {
  // Level 1: 0-99 XP, Level 2: 100-249 XP, Level 3: 250-499 XP, Level 4: 500-799 XP, etc.
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 800) return 4;
  if (xp < 1200) return 5;
  if (xp < 1700) return 6;
  if (xp < 2300) return 7;
  return Math.min(20, Math.floor(xp / 350) + 1);
};

export const getXpForNextLevel = (level: number): number => {
  const thresholds: Record<number, number> = {
    1: 100,
    2: 250,
    3: 500,
    4: 800,
    5: 1200,
    6: 1700,
    7: 2300,
  };
  return thresholds[level] || level * 350;
};

// Initial progress state
const getDefaultProgress = (): UserProgress => ({
  totalQuizzesTaken: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  currentStreak: 1,
  lastActiveDate: getTodayDateString(),
  totalStudyTimeMinutes: 0,
  problemsSolved: 0,
  videosWatched: 0,
  subjectsStudied: [],
  unlockedBadgeIds: ['first_step'], // Award welcoming badge
  xp: 50,
  level: 1,
});

export const getUserProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultProgress();
      saveUserProgress(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as UserProgress;
    
    // Ensure all required fields exist
    return {
      ...getDefaultProgress(),
      ...parsed,
      subjectsStudied: Array.isArray(parsed.subjectsStudied) ? parsed.subjectsStudied : [],
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : ['first_step'],
    };
  } catch (e) {
    console.warn('Error reading progress:', e);
    return getDefaultProgress();
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

// Listeners for badge unlock events
type BadgeUnlockCallback = (badge: Badge) => void;
const badgeListeners: BadgeUnlockCallback[] = [];

export const onBadgeUnlocked = (callback: BadgeUnlockCallback): (() => void) => {
  badgeListeners.push(callback);
  return () => {
    const idx = badgeListeners.indexOf(callback);
    if (idx !== -1) badgeListeners.splice(idx, 1);
  };
};

const notifyBadgeUnlocked = (badge: Badge) => {
  badgeListeners.forEach(cb => {
    try {
      cb(badge);
    } catch (err) {
      console.error('Error in badge listener:', err);
    }
  });
};

/**
 * Checks all badge criteria against current progress and unlocks any new badges
 */
export const checkAndUnlockBadges = (progress: UserProgress): { updatedProgress: UserProgress; newBadges: Badge[] } => {
  const currentUnlocked = new Set(progress.unlockedBadgeIds);
  const newBadges: Badge[] = [];

  const unlock = (badgeId: string) => {
    if (!currentUnlocked.has(badgeId)) {
      currentUnlocked.add(badgeId);
      const b = ALL_BADGES.find(item => item.id === badgeId);
      if (b) {
        newBadges.push(b);
        notifyBadgeUnlocked(b);
      }
    }
  };

  // Check badges
  unlock('first_step');

  if (progress.problemsSolved >= 5) unlock('problem_solver_5');
  if (progress.totalQuizzesTaken >= 1) unlock('quiz_starter');
  if (progress.totalQuestionsAnswered >= 25) unlock('quiz_veteran');
  if (progress.totalQuestionsAnswered >= 50) unlock('quiz_grandmaster');
  
  if (progress.totalStudyTimeMinutes >= 10) unlock('timer_novice');
  if (progress.totalStudyTimeMinutes >= 30) unlock('deep_focus');
  if (progress.totalStudyTimeMinutes >= 60) unlock('study_marathon');

  if (progress.currentStreak >= 3) unlock('streak_3');
  if (progress.currentStreak >= 7) unlock('streak_7');

  if (progress.subjectsStudied.length >= 4) unlock('polymath');

  const lowerSubjects = progress.subjectsStudied.map(s => s.toLowerCase());
  const hasMath = lowerSubjects.some(s => s.includes('math'));
  const hasPhysics = lowerSubjects.some(s => s.includes('phys'));
  const hasChem = lowerSubjects.some(s => s.includes('chem'));
  if (hasMath && hasPhysics && hasChem) unlock('stem_master');

  if (progress.videosWatched >= 3) unlock('video_enthusiast');

  if (progress.totalQuestionsAnswered >= 15) {
    const accuracy = progress.totalCorrectAnswers / progress.totalQuestionsAnswered;
    if (accuracy >= 0.8) unlock('high_accuracy');
  }

  if (progress.xp >= 500 && progress.level >= 5) unlock('valedictorian');

  const updatedProgress: UserProgress = {
    ...progress,
    unlockedBadgeIds: Array.from(currentUnlocked),
  };

  saveUserProgress(updatedProgress);
  return { updatedProgress, newBadges };
};

/**
 * Update daily streak on any activity
 */
const updateStreak = (progress: UserProgress): UserProgress => {
  const today = getTodayDateString();
  if (progress.lastActiveDate === today) {
    return progress;
  }

  const lastDate = new Date(progress.lastActiveDate);
  const currentDate = new Date(today);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let newStreak = progress.currentStreak;
  if (diffDays === 1) {
    newStreak += 1;
  } else if (diffDays > 1) {
    newStreak = 1;
  }

  return {
    ...progress,
    currentStreak: newStreak,
    lastActiveDate: today,
  };
};

/**
 * Record a completed quiz
 */
export const recordQuizCompleted = (
  score: number,
  totalQuestions: number,
  subject: Subject,
  level: AudienceLevel
): { updatedProgress: UserProgress; newBadges: Badge[] } => {
  let progress = updateStreak(getUserProgress());

  const isPerfect = score === totalQuestions && totalQuestions > 0;
  const gainedXp = score * 15 + totalQuestions * 5 + (isPerfect ? 50 : 0);

  const subjectStr = subject.toString();
  const subjects = new Set(progress.subjectsStudied);
  subjects.add(subjectStr);

  const newTotalQuizzes = progress.totalQuizzesTaken + 1;
  const newTotalQuestions = progress.totalQuestionsAnswered + totalQuestions;
  const newTotalCorrect = progress.totalCorrectAnswers + score;
  const newXp = progress.xp + gainedXp;
  const newLevel = calculateLevel(newXp);

  progress = {
    ...progress,
    totalQuizzesTaken: newTotalQuizzes,
    totalQuestionsAnswered: newTotalQuestions,
    totalCorrectAnswers: newTotalCorrect,
    subjectsStudied: Array.from(subjects),
    xp: newXp,
    level: newLevel,
  };

  if (isPerfect) {
    const aceBadge = ALL_BADGES.find(b => b.id === 'quiz_ace');
    if (aceBadge && !progress.unlockedBadgeIds.includes('quiz_ace')) {
      progress.unlockedBadgeIds.push('quiz_ace');
      notifyBadgeUnlocked(aceBadge);
    }
  }

  return checkAndUnlockBadges(progress);
};

/**
 * Record time spent on the study timer (in minutes)
 */
export const recordStudyTime = (
  minutes: number
): { updatedProgress: UserProgress; newBadges: Badge[] } => {
  if (minutes <= 0) return { updatedProgress: getUserProgress(), newBadges: [] };

  let progress = updateStreak(getUserProgress());
  const gainedXp = Math.round(minutes * 4); // 4 XP per minute of study
  const newTotalMinutes = progress.totalStudyTimeMinutes + minutes;
  const newXp = progress.xp + gainedXp;
  const newLevel = calculateLevel(newXp);

  progress = {
    ...progress,
    totalStudyTimeMinutes: newTotalMinutes,
    xp: newXp,
    level: newLevel,
  };

  if (minutes >= 30) {
    const deepFocusBadge = ALL_BADGES.find(b => b.id === 'deep_focus');
    if (deepFocusBadge && !progress.unlockedBadgeIds.includes('deep_focus')) {
      progress.unlockedBadgeIds.push('deep_focus');
      notifyBadgeUnlocked(deepFocusBadge);
    }
  }

  return checkAndUnlockBadges(progress);
};

/**
 * Record a problem solved through the input form
 */
export const recordProblemSolved = (
  subject: Subject
): { updatedProgress: UserProgress; newBadges: Badge[] } => {
  let progress = updateStreak(getUserProgress());

  const subjectStr = subject.toString();
  const subjects = new Set(progress.subjectsStudied);
  subjects.add(subjectStr);

  const newProblems = progress.problemsSolved + 1;
  const newXp = progress.xp + 20;
  const newLevel = calculateLevel(newXp);

  progress = {
    ...progress,
    problemsSolved: newProblems,
    subjectsStudied: Array.from(subjects),
    xp: newXp,
    level: newLevel,
  };

  return checkAndUnlockBadges(progress);
};

/**
 * Record a video lesson watched
 */
export const recordVideoWatched = (
  subject: Subject
): { updatedProgress: UserProgress; newBadges: Badge[] } => {
  let progress = updateStreak(getUserProgress());

  const subjectStr = subject.toString();
  const subjects = new Set(progress.subjectsStudied);
  subjects.add(subjectStr);

  const newVideos = progress.videosWatched + 1;
  const newXp = progress.xp + 25;
  const newLevel = calculateLevel(newXp);

  progress = {
    ...progress,
    videosWatched: newVideos,
    subjectsStudied: Array.from(subjects),
    xp: newXp,
    level: newLevel,
  };

  return checkAndUnlockBadges(progress);
};
