import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import { 
  getUserProgress, 
  ALL_BADGES, 
  getXpForNextLevel, 
  Badge, 
  UserProgress 
} from '../services/gamificationService';

interface ProgressTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTimer?: () => void;
  onOpenQuiz?: () => void;
}

export const ProgressTrackerModal: React.FC<ProgressTrackerModalProps> = ({
  isOpen,
  onClose,
  onOpenTimer,
  onOpenQuiz,
}) => {
  const [progress, setProgress] = useState<UserProgress>(getUserProgress);
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'subjects'>('overview');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    if (isOpen) {
      setProgress(getUserProgress());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentLevelXpGoal = getXpForNextLevel(progress.level);
  const prevLevelXp = progress.level === 1 ? 0 : getXpForNextLevel(progress.level - 1);
  const xpInCurrentLevel = progress.xp - prevLevelXp;
  const xpNeededForLevel = currentLevelXpGoal - prevLevelXp;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / Math.max(1, xpNeededForLevel)) * 100)));

  const accuracyPercent = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
    : 0;

  const unlockedCount = progress.unlockedBadgeIds.length;
  const totalBadgesCount = ALL_BADGES.length;

  const filteredBadges = ALL_BADGES.filter((badge) => {
    const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
    if (badgeFilter === 'unlocked') return isUnlocked;
    if (badgeFilter === 'locked') return !isUnlocked;
    return true;
  });

  const getTierColor = (tier: Badge['tier']) => {
    switch (tier) {
      case 'platinum':
        return 'border-cyan-400 bg-cyan-50/80 text-cyan-900 shadow-cyan-100';
      case 'gold':
        return 'border-amber-400 bg-amber-50/80 text-amber-900 shadow-amber-100';
      case 'silver':
        return 'border-slate-300 bg-slate-50 text-slate-800 shadow-slate-100';
      case 'bronze':
      default:
        return 'border-orange-300 bg-orange-50/70 text-orange-950 shadow-orange-100';
    }
  };

  const getTierBadge = (tier: Badge['tier']) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white';
      case 'gold':
        return 'bg-gradient-to-r from-amber-400 to-yellow-600 text-white';
      case 'silver':
        return 'bg-gradient-to-r from-slate-400 to-gray-600 text-white';
      case 'bronze':
      default:
        return 'bg-gradient-to-r from-amber-700 to-orange-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-[var(--color-surface)] to-blue-500/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <span>Academic Growth Engine</span>
              <span>·</span>
              <span>Gamified Achievements</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)] flex items-center gap-2">
              <span>📊 Progress Tracker & Gamification Badges</span>
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Track your study streaks, accuracy rate, focus hours, and unlock prestigious academic achievements.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)]/70 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
            >
              📈 Learning Overview
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'badges'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
            >
              <span>🏆 Badges Showcase</span>
              <span className="bg-amber-400/30 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                {unlockedCount}/{totalBadgesCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'subjects'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
            >
              📚 Subject Mastery ({progress.subjectsStudied.length})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
            <span>🔥 Streak: {progress.currentStreak} Day{progress.currentStreak === 1 ? '' : 's'}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Level & XP Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-blue-500/10 border border-amber-300/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-black text-2xl flex items-center justify-center shadow-md border-2 border-amber-300">
                    L{progress.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[var(--color-text-main)]">
                        Level {progress.level} Scholar
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                        {progress.xp} Total XP
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {progress.level >= 5 ? 'Grand Academician Tier' : progress.level >= 3 ? 'Senior Fellow Tier' : 'Dedicated Apprentice Tier'}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[var(--color-text-subtle)]">
                    <span>Progress to Level {progress.level + 1}</span>
                    <span>{levelProgressPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${levelProgressPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right text-[var(--color-text-subtle)]">
                    {xpInCurrentLevel} / {xpNeededForLevel} XP needed
                  </div>
                </div>
              </div>

              {/* Core Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">🔥</span>
                  <span className="text-2xl font-black text-[var(--color-text-main)]">{progress.currentStreak}</span>
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Active Day Streak</span>
                  <span className="text-[10px] text-amber-700 mt-1">Study daily to keep flame alive</span>
                </div>

                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">⏱️</span>
                  <span className="text-2xl font-black text-[var(--color-text-main)]">{progress.totalStudyTimeMinutes}m</span>
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Focus Timer Time</span>
                  <span className="text-[10px] text-blue-700 mt-1">Logged with Study Timer</span>
                </div>

                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">📝</span>
                  <span className="text-2xl font-black text-[var(--color-text-main)]">{progress.totalQuizzesTaken}</span>
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Quizzes Completed</span>
                  <span className="text-[10px] text-purple-700 mt-1">{progress.totalQuestionsAnswered} total questions</span>
                </div>

                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">🎯</span>
                  <span className="text-2xl font-black text-[var(--color-text-main)]">{accuracyPercent}%</span>
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Quiz Accuracy</span>
                  <span className="text-[10px] text-green-700 mt-1">{progress.totalCorrectAnswers} correct answers</span>
                </div>
              </div>

              {/* Action Jump Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {onOpenTimer && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTimer();
                    }}
                    className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-between text-left transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-xs">Start a Study Session (Up to 30 mins)</div>
                      <div className="text-[11px] text-amber-800/80">Log focus time and boost your streak</div>
                    </div>
                    <span className="text-lg">⏱️</span>
                  </button>
                )}

                {onOpenQuiz && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuiz();
                    }}
                    className="p-3.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 flex items-center justify-between text-left transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-xs">Take an Academic Quiz (Up to 50 Questions)</div>
                      <div className="text-[11px] text-blue-800/80">Test your mastery and earn XP</div>
                    </div>
                    <span className="text-lg">📝</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BADGES SHOWCASE */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--color-border)]">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-text-main)]">
                    Gamification Badges Collection
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Complete learning challenges and quizzes to unlock all {totalBadgesCount} academic insignias.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs bg-[var(--color-surface-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
                  {(['all', 'unlocked', 'locked'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setBadgeFilter(filter)}
                      className={`px-2.5 py-1 rounded-md font-semibold capitalize transition-all ${
                        badgeFilter === filter
                          ? 'bg-[var(--color-accent)] text-white shadow-2xs'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredBadges.map((badge) => {
                  const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-xl border transition-all relative overflow-hidden flex items-start gap-3 ${
                        isUnlocked
                          ? getTierColor(badge.tier)
                          : 'border-slate-200 bg-slate-50/50 opacity-60 grayscale'
                      }`}
                    >
                      <div className="text-3xl p-2 rounded-xl bg-white/80 border border-black/5 shadow-2xs shrink-0 flex items-center justify-center">
                        {badge.icon}
                      </div>

                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs text-[var(--color-text-main)] line-clamp-1">
                            {badge.name}
                          </h4>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full ${getTierBadge(badge.tier)}`}>
                            {badge.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                          {badge.description}
                        </p>
                        <div className="text-[10px] font-semibold flex items-center gap-1 pt-0.5">
                          {isUnlocked ? (
                            <span className="text-green-700 font-bold flex items-center gap-1">
                              <span>✓</span> Unlocked
                            </span>
                          ) : (
                            <span className="text-slate-400 flex items-center gap-1">
                              <span>🔒</span> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SUBJECT MASTERY */}
          {activeTab === 'subjects' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-main)]">
                  Explored Curriculum Disciplines
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Disciplines you have engaged through questions and quizzes.
                </p>
              </div>

              {progress.subjectsStudied.length === 0 ? (
                <div className="p-8 text-center bg-[var(--color-surface-subtle)] rounded-xl border border-dashed border-[var(--color-border)]">
                  <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                    No subjects explored yet!
                  </p>
                  <p className="text-xs text-[var(--color-text-subtle)] mt-1">
                    Solve a problem in any subject or take a quiz to begin filling your mastery portfolio.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {progress.subjectsStudied.map((subj, index) => (
                    <div
                      key={subj}
                      className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 font-bold text-xs flex items-center justify-center border border-amber-300">
                          {index + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[var(--color-text-main)]">{subj}</div>
                          <div className="text-[10px] text-[var(--color-text-subtle)]">Active Curriculum Discipline</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-300">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
