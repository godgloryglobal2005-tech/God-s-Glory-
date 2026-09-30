import { Score } from '../types';

const SCOREBOARD_KEY = 'gods_glory_tutors_scoreboard';

// Helper to get all scores from localStorage
export const getScores = (): Score[] => {
  try {
    const scores = localStorage.getItem(SCOREBOARD_KEY);
    const parsedScores = scores ? JSON.parse(scores) : [];
    return parsedScores.sort((a: Score, b: Score) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.timestamp - a.timestamp;
    });
  } catch (error) {
    return [];
  }
};

export const fetchScores = async (): Promise<Score[]> => {
  try {
    const res = await fetch('/api/scores');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.scores)) {
        saveScores(data.scores);
        return data.scores;
      }
    }
  } catch (e) {}
  return getScores();
};

// Helper to save scores back to localStorage
export const saveScores = (scores: Score[]): void => {
  try {
    localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error("Failed to save scores:", error);
  }
};

// Helper to add a new score
export const addScore = async (newScore: Omit<Score, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newScore),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.scores)) {
        saveScores(data.scores);
        return;
      }
    }
  } catch (e) {}

  // Local fallback
  try {
    const scores = getScores();
    const scoreToAdd: Score = {
      ...newScore,
      id: 'score-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
    };
    scores.push(scoreToAdd);
    scores.sort((a, b) => b.score !== a.score ? b.score - a.score : b.timestamp - a.timestamp);
    saveScores(scores);
  } catch (error) {
    console.error("Failed to add score:", error);
  }
};

export const clearAllScores = async (): Promise<void> => {
  try {
    await fetch('/api/scores', { method: 'DELETE' });
  } catch (e) {}
  saveScores([]);
};
