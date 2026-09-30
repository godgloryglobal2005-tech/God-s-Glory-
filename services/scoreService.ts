import { Score } from '../types';

const SCOREBOARD_KEY = 'gods_glory_tutors_scoreboard';

// Helper to get all scores from localStorage
export const getScores = (): Score[] => {
  try {
    const scores = localStorage.getItem(SCOREBOARD_KEY);
    const parsedScores = scores ? JSON.parse(scores) : [];
    // Ensure scores are sorted on retrieval as well
    return parsedScores.sort((a: Score, b: Score) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return b.timestamp - a.timestamp;
    });
  } catch (error) {
    console.error("Failed to retrieve scores:", error);
    return [];
  }
};

// Helper to save scores back to localStorage
export const saveScores = (scores: Score[]): void => {
    try {
        localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scores));
    } catch (error) {
        console.error("Failed to save scores:", error);
    }
}

// Helper to add a new score
export const addScore = (newScore: Omit<Score, 'id' | 'timestamp'>): void => {
  try {
    const scores = getScores();
    const scoreToAdd: Score = {
      ...newScore,
      id: new Date().toISOString() + Math.random(),
      timestamp: Date.now(),
    };
    scores.push(scoreToAdd);
    
    // Sort by score descending, then by timestamp descending for tie-breaking
    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.timestamp - a.timestamp;
    });

    saveScores(scores);
  } catch (error) {
    console.error("Failed to add score:", error);
  }
};
