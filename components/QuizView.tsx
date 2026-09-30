import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Subject, Quiz, User, AudienceLevel, ALL_SUBJECTS } from '../types';
import { generateQuiz } from '../services/geminiService';
import * as scoreService from '../services/scoreService';
import { recordQuizCompleted } from '../services/gamificationService';
import { getActiveCountryCode, getCountryByCode, COUNTRIES, setActiveCountryCode } from '../services/countryCurriculumService';
import Spinner from './Spinner';

interface QuizViewProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onProgressUpdated?: () => void;
}

const QUESTION_COUNT_PRESETS = [5, 10, 15, 20, 25, 30, 40, 50];
const TIMER_MINUTE_PRESETS = [
  { label: 'Untimed (No Rush)', value: 0 },
  { label: '5 Minutes', value: 5 },
  { label: '10 Minutes', value: 10 },
  { label: '15 Minutes', value: 15 },
  { label: '20 Minutes', value: 20 },
  { label: '25 Minutes', value: 25 },
  { label: '30 Minutes (Max Limit)', value: 30 },
];

export const QuizView: React.FC<QuizViewProps> = ({ currentUser, onLoginClick, onProgressUpdated }) => {
  const [subject, setSubject] = useState<Subject>(Subject.Math);
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>(AudienceLevel.HighSchool);
  const [countryCode, setCountryCode] = useState<string>(() => currentUser?.country || getActiveCountryCode());
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerMinutes, setTimerMinutes] = useState<number>(15); // Capped at 30 minutes
  const [viewMode, setViewMode] = useState<'sheet' | 'stepper'>('sheet'); // 'sheet' ensures all questions come out openly!

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCountry = getCountryByCode(countryCode);

  const [quizState, setQuizState] = useState<'setup' | 'active' | 'results'>('setup');
  // Store user answers: questionIndex -> selectedOptionIndex (or -1 if skipped)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [stepperIndex, setStepperIndex] = useState<number>(0);

  // Overall Quiz Timer in seconds
  const [quizSecondsRemaining, setQuizSecondsRemaining] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const playSound = useCallback((type: 'correct' | 'incorrect' | 'timeup') => {
    if (!soundEnabled || !window.AudioContext) return;
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'timeup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.6);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220.0, ctx.currentTime); // A3
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn('Audio error:', e);
      setSoundEnabled(false);
    }
  }, [soundEnabled]);

  const resetQuiz = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setQuiz(null);
    setError(null);
    setQuizState('setup');
    setUserAnswers({});
    setStepperIndex(0);
    setQuizSecondsRemaining(0);
  }, []);

  // Submit quiz and calculate final score
  const handleSubmitQuiz = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (!quiz) return;

    let finalScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        finalScore++;
      }
    });

    // Save score in local score service
    if (currentUser) {
      scoreService.addScore({
        email: currentUser.email,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        subject: subject,
        level: audienceLevel,
      });

      // Record in gamification engine (streaks, badges, XP)
      recordQuizCompleted(finalScore, quiz.questions.length, subject, audienceLevel);
      if (onProgressUpdated) {
        onProgressUpdated();
      }
    }

    setQuizState('results');
  }, [quiz, userAnswers, currentUser, subject, audienceLevel, onProgressUpdated]);

  // Handle countdown timer
  useEffect(() => {
    if (quizState === 'active' && timerMinutes > 0 && quizSecondsRemaining > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setQuizSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            playSound('timeup');
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [quizState, timerMinutes, quizSecondsRemaining, handleSubmitQuiz, playSound]);

  const handleGenerateQuiz = async () => {
    if (!currentUser) {
      onLoginClick();
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    setUserAnswers({});
    setStepperIndex(0);

    // Strictly enforce maximum 50 questions
    const safeCount = Math.min(50, Math.max(1, questionCount));
    // Strictly enforce maximum 30 minutes
    const safeTimerMins = Math.min(30, Math.max(0, timerMinutes));

    try {
      const quizData = await generateQuiz(
        subject,
        audienceLevel,
        safeCount,
        undefined,
        undefined,
        undefined,
        undefined,
        activeCountry.name,
        activeCountry.curriculumName
      );

      setQuiz(quizData);
      setQuizState('active');
      if (safeTimerMins > 0) {
        setQuizSecondsRemaining(safeTimerMins * 60);
      } else {
        setQuizSecondsRemaining(0);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Could not generate quiz. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = quiz?.questions.length || 0;

  // Render Setup Screen
  const renderSetup = () => (
    <div className="text-center max-w-2xl mx-auto py-2">
      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 rounded-full px-3 py-1 text-xs font-bold mb-3">
        <span>✨ Academic Mastery & Examination Simulator</span>
      </div>

      <h2 className="text-3xl font-extrabold text-[var(--color-text-main)] mb-2">
        Test Your Knowledge!
      </h2>
      <p className="text-[var(--color-text-muted)] text-sm mb-6">
        Select your subject, exact question count (up to 50 questions), and selective exam timer (up to 30 minutes). All questions are displayed openly for your full review!
      </p>

      <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-2xl p-6 text-left shadow-sm space-y-6">
        {/* Country & Curriculum Alignment Badge */}
        <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-900/10 border border-amber-300/40 rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeCountry.flag}</span>
            <div>
              <div className="text-xs font-bold text-[var(--color-text-main)]">
                {activeCountry.name} Exam Standard
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">
                {activeCountry.curriculumName}
              </div>
            </div>
          </div>
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setActiveCountryCode(e.target.value);
            }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2 py-1 text-xs font-bold text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 1. Subject & Audience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quiz-subject-select" className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-1.5 block">
              1. Choose Academic Subject
            </label>
            <select
              id="quiz-subject-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-2.5 text-xs font-semibold text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition"
            >
              {ALL_SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quiz-level-select" className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-1.5 block">
              2. Select Audience Level
            </label>
            <select
              id="quiz-level-select"
              value={audienceLevel}
              onChange={(e) => setAudienceLevel(e.target.value as AudienceLevel)}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-2.5 text-xs font-semibold text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition"
            >
              {Object.values(AudienceLevel).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Number of Questions (Max 50) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)]">
              3. Number of Quiz Questions (Max 50)
            </label>
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
              Selected: {questionCount} Questions
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-2.5">
            {QUESTION_COUNT_PRESETS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  questionCount === count
                    ? 'bg-[var(--color-accent)] text-white shadow-xs scale-102'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-main)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {count} Qs
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-[var(--color-surface)] p-2.5 rounded-xl border border-[var(--color-border)]">
            <span className="text-xs text-[var(--color-text-subtle)] whitespace-nowrap">Custom Slider (1 - 50):</span>
            <input
              type="range"
              min="1"
              max="50"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.min(50, Math.max(1, parseInt(e.target.value, 10))))}
              className="w-full accent-[var(--color-accent)] cursor-pointer"
            />
            <span className="text-xs font-bold text-[var(--color-text-main)] min-w-[40px] text-center bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {questionCount}
            </span>
          </div>
        </div>

        {/* 3. Selective Timer (Max 30 Mins) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)]">
              4. Selective Exam Timer (Max 30 Minutes)
            </label>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
              {timerMinutes === 0 ? 'Untimed Practice' : `${timerMinutes} Minutes`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
            {TIMER_MINUTE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setTimerMinutes(preset.value)}
                className={`p-2 rounded-lg text-xs font-bold text-left transition-all ${
                  timerMinutes === preset.value
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-main)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <div>{preset.label}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-[var(--color-surface)] p-2.5 rounded-xl border border-[var(--color-border)]">
            <span className="text-xs text-[var(--color-text-subtle)] whitespace-nowrap">Custom Minute (0 - 30m):</span>
            <input
              type="range"
              min="0"
              max="30"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(Math.min(30, Math.max(0, parseInt(e.target.value, 10))))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-amber-900 min-w-[65px] text-center bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
              {timerMinutes === 0 ? 'Untimed' : `${timerMinutes} m`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {currentUser ? (
          <button
            onClick={handleGenerateQuiz}
            disabled={isLoading}
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 text-base shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🚀 Generate {questionCount}-Question Academic Quiz</span>
          </button>
        ) : (
          <div className="p-4 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm">
              <span>🔒</span>
              <span>Account Sign Up or Log In Required</span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Interactive syllabus quizzes and leaderboard scoring require an account. Please sign up or log in to begin.
            </p>
            <button
              type="button"
              onClick={onLoginClick}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2.5 px-5 rounded-lg text-xs shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Sign Up / Log In to Take Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Active Quiz (where all questions come out openly and are not hidden!)
  const renderActiveQuiz = () => {
    if (!quiz) return null;

    const timerColor =
      quizSecondsRemaining <= 60
        ? 'text-red-600 animate-pulse'
        : quizSecondsRemaining <= 300
        ? 'text-amber-600'
        : 'text-[var(--color-text-main)]';

    const formatTimer = (totalSecs: number) => {
      const m = Math.floor(totalSecs / 60);
      const s = totalSecs % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
      <div className="space-y-6">
        {/* Sticky Top Quiz Control & Status Header */}
        <div className="sticky top-0 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-border)] shadow-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={resetQuiz}
                className="text-xs bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-lg font-bold transition-colors"
              >
                Quit Quiz
              </button>
              <h2 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] line-clamp-1">
                {quiz.quizTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {timerMinutes > 0 && (
                <div className={`px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 font-mono font-bold text-sm ${timerColor}`}>
                  ⏱️ {formatTimer(quizSecondsRemaining)}
                </div>
              )}

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 text-lg rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>

              <button
                onClick={handleSubmitQuiz}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-1.5 px-4 rounded-lg shadow-sm transition-all"
              >
                Submit Test ({answeredCount}/{totalCount})
              </button>
            </div>
          </div>

          {/* Quick-Jump Question Palette so all questions are visibly represented */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-text-subtle)]">
              <span>
                Questions Quick Jump: <strong>{answeredCount}</strong> of <strong>{totalCount}</strong> Answered
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'sheet' ? 'stepper' : 'sheet')}
                  className="text-[11px] text-[var(--color-accent)] underline font-bold"
                >
                  {viewMode === 'sheet' ? 'Switch to Card Focus' : '📄 Show All Questions Out (Test Paper)'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)]">
              {quiz.questions.map((_, qIdx) => {
                const isAnswered = userAnswers[qIdx] !== undefined;
                return (
                  <button
                    key={qIdx}
                    onClick={() => {
                      if (viewMode === 'sheet') {
                        const el = document.getElementById(`question-card-${qIdx}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        setStepperIndex(qIdx);
                      }
                    }}
                    className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                      isAnswered
                        ? 'bg-green-600 text-white shadow-2xs'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-main)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
                    }`}
                  >
                    {qIdx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MODE 1: FULL OPEN TEST SHEET (All questions come out and are NOT hidden!) */}
        {viewMode === 'sheet' && (
          <div className="space-y-6">
            {quiz.questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[qIndex];
              return (
                <div
                  key={qIndex}
                  id={`question-card-${qIndex}`}
                  className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 font-extrabold text-sm flex items-center justify-center border border-blue-300">
                        {qIndex + 1}
                      </span>
                      <span className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-wider">
                        Question {qIndex + 1} of {totalCount}
                      </span>
                    </div>

                    {selectedOpt !== undefined ? (
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full border border-green-300">
                        Answered (Option {String.fromCharCode(65 + selectedOpt)})
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Pending
                      </span>
                    )}
                  </div>

                  <p className="text-base sm:text-lg font-medium text-[var(--color-text-main)] leading-relaxed">
                    {q.questionText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(qIndex, optIndex)}
                          className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-xs'
                              : 'bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border-[var(--color-border)] text-[var(--color-text-main)]'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="text-xs sm:text-sm pt-0.5 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Bottom Submit Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-green-500/10 border border-[var(--color-border)] text-center space-y-3">
              <h3 className="text-base font-bold text-[var(--color-text-main)]">
                Ready to Grade Your Examination?
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                You have answered {answeredCount} of {totalCount} questions. Click below to view your score, mastery percentage, and step-by-step solutions!
              </p>
              <button
                onClick={handleSubmitQuiz}
                className="py-3 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Grade Quiz & View Detailed Solutions
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: CARD STEPPER (For focused single-question review) */}
        {viewMode === 'stepper' && (
          <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5">
            {(() => {
              const currentQ = quiz.questions[stepperIndex];
              const selectedOpt = userAnswers[stepperIndex];
              return (
                <>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
                    <span className="font-bold">Question {stepperIndex + 1} of {totalCount}</span>
                    <span>{selectedOpt !== undefined ? '✓ Answered' : 'Unanswered'}</span>
                  </div>

                  <p className="text-lg font-medium text-[var(--color-text-main)]">
                    {currentQ.questionText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(stepperIndex, optIndex)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                              : 'bg-[var(--color-surface-subtle)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-main)]'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="text-sm pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => setStepperIndex(Math.max(0, stepperIndex - 1))}
                      disabled={stepperIndex === 0}
                      className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-xs font-bold disabled:opacity-30"
                    >
                      Previous
                    </button>

                    <button
                      onClick={() => {
                        if (stepperIndex < totalCount - 1) {
                          setStepperIndex(stepperIndex + 1);
                        } else {
                          handleSubmitQuiz();
                        }
                      }}
                      className="px-5 py-2 rounded-lg bg-[var(--color-accent)] text-white text-xs font-bold shadow-xs"
                    >
                      {stepperIndex < totalCount - 1 ? 'Next Question' : 'Submit Quiz'}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    );
  };

  // Render Results with ALL answers & full explanations completely visible
  const renderResults = () => {
    if (!quiz) return null;

    let finalScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        finalScore++;
      }
    });

    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    const feedback =
      percentage === 100
        ? { title: 'Flawless Victory!', message: "You're an absolute genius! Perfect 100% score!", emoji: '🏆' }
        : percentage >= 80
        ? { title: 'Distinction Performance!', message: 'You have mastered this curriculum topic thoroughly.', emoji: '🎉' }
        : percentage >= 50
        ? { title: 'Credit Pass!', message: 'Solid work. Review the step-by-step explanations below to achieve distinction.', emoji: '👍' }
        : { title: 'Needs Revision!', message: 'Keep working at it! Thoroughly read the syllabus explanations below.', emoji: '🧠' };

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Score Card Header */}
        <div className="p-8 text-center bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-green-500/15 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-3">
          <div className="text-6xl">{feedback.emoji}</div>
          <h2 className="text-3xl font-extrabold text-[var(--color-text-main)]">{feedback.title}</h2>
          <p className="text-[var(--color-text-muted)] text-sm max-w-md mx-auto">{feedback.message}</p>
          <div className="text-4xl sm:text-5xl font-black text-[var(--color-text-accent)] py-2">
            {finalScore} / {quiz.questions.length} ({percentage}%)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={resetQuiz}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              🔄 Take Another Quiz
            </button>
          </div>
        </div>

        {/* Full Explanations for all questions displayed openly! */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] flex items-center justify-between">
            <span>Detailed Examination Review & Explanations ({quiz.questions.length} Questions)</span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              All questions, marking guides, and explanations revealed below
            </span>
          </h3>

          {quiz.questions.map((q, idx) => {
            const userChoice = userAnswers[idx];
            const isCorrect = userChoice === q.correctAnswerIndex;

            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border-2 space-y-3 bg-[var(--color-surface)] ${
                  isCorrect ? 'border-green-400 bg-green-50/20' : 'border-red-300 bg-red-50/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center text-white ${
                        isCorrect ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-main)]">
                      Question {idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {isCorrect ? '✓ Correct (+1 Mark)' : '✗ Incorrect (0 Marks)'}
                  </span>
                </div>

                <p className="text-base font-semibold text-[var(--color-text-main)]">{q.questionText}</p>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isCorrectAnswer = optIdx === q.correctAnswerIndex;
                    const isUserPick = optIdx === userChoice;

                    let optClass = 'p-3 rounded-xl border flex items-center gap-2 ';
                    if (isCorrectAnswer) {
                      optClass += 'bg-green-100/90 border-green-500 text-green-950 font-bold';
                    } else if (isUserPick) {
                      optClass += 'bg-red-100 border-red-500 text-red-950 font-bold';
                    } else {
                      optClass += 'bg-[var(--color-surface-subtle)] border-[var(--color-border)] text-[var(--color-text-subtle)] opacity-70';
                    }

                    return (
                      <div key={optIdx} className={optClass}>
                        <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                        {isCorrectAnswer && <span className="ml-auto text-green-700 font-bold">✓ Correct Answer</span>}
                        {isUserPick && !isCorrectAnswer && <span className="ml-auto text-red-700 font-bold">✗ Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <span>💡 Academic Explanation & Marking Guide</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-[var(--color-surface)]/80 rounded-2xl p-4 sm:p-6 w-full flex-grow flex flex-col justify-center shadow-lg border border-[var(--color-border)]/70 min-h-[500px]">
      {!currentUser && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-40 flex flex-col justify-center items-center rounded-2xl p-4">
          <div className="text-4xl mb-2">🎯</div>
          <h3 className="text-xl font-bold text-[var(--color-text-main)] text-center">Let's Get Quizzing!</h3>
          <p className="text-[var(--color-text-muted)] text-center text-xs mt-1 mb-4 max-w-sm">
            Sign in to unlock interactive quizzes with up to 50 questions, selective 30-minute exam timers, and earn XP towards gamification badges.
          </p>
          <button
            onClick={onLoginClick}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md text-xs cursor-pointer"
          >
            Login or Sign Up
          </button>
        </div>
      )}

      <div className={!currentUser ? 'blur-xs' : ''}>
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Spinner />
            <p className="text-xs font-semibold text-[var(--color-text-muted)] animate-pulse">
              Curating {questionCount} academic questions for {subject} ({audienceLevel})...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-red-700 bg-red-100/70 p-4 rounded-xl w-full text-center border border-red-300 text-xs font-medium my-4">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {quizState === 'setup' && renderSetup()}
            {quizState === 'active' && renderActiveQuiz()}
            {quizState === 'results' && renderResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizView;
