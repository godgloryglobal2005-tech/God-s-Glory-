import React, { useState, useEffect, useRef, useCallback } from 'react';
import CloseIcon from './icons/CloseIcon';
import { recordStudyTime } from '../services/gamificationService';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudyCompleted?: (minutes: number) => void;
}

const PRESET_DURATIONS = [
  { label: '5 min', minutes: 5, desc: 'Quick Review' },
  { label: '10 min', minutes: 10, desc: 'Concept Drill' },
  { label: '15 min', minutes: 15, desc: 'Active Recall' },
  { label: '20 min', minutes: 20, desc: 'Problem Solving' },
  { label: '25 min', minutes: 25, desc: 'Pomodoro Sprint' },
  { label: '30 min', minutes: 30, desc: 'Max Deep Focus' },
];

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({
  isOpen,
  onClose,
  onStudyCompleted,
}) => {
  // Duration in minutes (Strict maximum: 30 minutes)
  const [selectedMinutes, setSelectedMinutes] = useState<number>(25);
  const [totalSeconds, setTotalSeconds] = useState<number>(25 * 60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ambientSound, setAmbientSound] = useState<'none' | 'tick'>('none');

  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play harmonious completion chime
  const playCompletionChime = useCallback(() => {
    if (!soundEnabled || !window.AudioContext) return;
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Three harmonic chords (C5, E5, G5, C6)
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const startTime = ctx.currentTime + idx * 0.15;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }, [soundEnabled]);

  // Subtle clock tick sound
  const playTick = useCallback(() => {
    if (ambientSound !== 'tick' || !soundEnabled || !window.AudioContext) return;
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // ignore
    }
  }, [ambientSound, soundEnabled]);

  // Handle setting a new duration
  const handleSelectDuration = (mins: number) => {
    const capped = Math.min(30, Math.max(1, mins)); // Strictly cap at 30 minutes!
    setSelectedMinutes(capped);
    const secs = capped * 60;
    setTotalSeconds(secs);
    setSecondsRemaining(secs);
    setIsActive(false);
    setSessionCompleted(false);
  };

  // Timer interval
  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsActive(false);
            setSessionCompleted(true);
            playCompletionChime();

            // Record completed study time in gamification service
            recordStudyTime(selectedMinutes);
            if (onStudyCompleted) {
              onStudyCompleted(selectedMinutes);
            }
            return 0;
          }
          if (prev % 2 === 0) {
            playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, secondsRemaining, selectedMinutes, playCompletionChime, playTick, onStudyCompleted]);

  // Update document title with remaining time during active session
  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      const fmt = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      document.title = `⏱️ [${fmt}] God's Glory Study Session`;
    } else {
      document.title = "God's Glory Tutors";
    }
    return () => {
      document.title = "God's Glory Tutors";
    };
  }, [isActive, secondsRemaining]);

  const handleTogglePlay = () => {
    if (sessionCompleted) {
      handleSelectDuration(selectedMinutes);
      setIsActive(true);
      return;
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsRemaining(totalSeconds);
    setSessionCompleted(false);
  };

  const handleAddOneMinute = () => {
    if (secondsRemaining + 60 <= 30 * 60) {
      const nextRemaining = secondsRemaining + 60;
      setSecondsRemaining(nextRemaining);
      if (nextRemaining > totalSeconds) {
        setTotalSeconds(nextRemaining);
        setSelectedMinutes(Math.ceil(nextRemaining / 60));
      }
    }
  };

  if (!isOpen) return null;

  const minutesLeft = Math.floor(secondsRemaining / 60);
  const secondsLeft = secondsRemaining % 60;
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsRemaining) / totalSeconds : 0;
  const strokeDashoffset = 283 - 283 * progressRatio;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-[var(--color-surface)] to-blue-500/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <span>God's Glory Study Sanctum</span>
              <span>·</span>
              <span>Max 30 Min Cap</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)] flex items-center gap-2">
              <span>⏱️ Selective Study Timer</span>
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Choose your focus duration (up to 30 minutes maximum) for disciplined, high-retention study.
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

        <div className="p-6 space-y-6">
          {/* Selective Duration Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[var(--color-text-main)] uppercase tracking-wider">
                1. Select Focus Duration (Max: 30 Mins)
              </label>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                Active: {selectedMinutes} Minutes
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_DURATIONS.map((preset) => {
                const isSelected = selectedMinutes === preset.minutes;
                return (
                  <button
                    key={preset.minutes}
                    type="button"
                    onClick={() => handleSelectDuration(preset.minutes)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md font-bold scale-102'
                        : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] font-medium text-xs'
                    }`}
                  >
                    <div className="text-xs font-bold">{preset.label}</div>
                    <div className="text-[9px] opacity-80 truncate">{preset.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom slider up to 30 minutes max */}
            <div className="mt-3 bg-[var(--color-surface-subtle)] p-3 rounded-xl border border-[var(--color-border)] flex items-center gap-3">
              <span className="text-xs font-medium text-[var(--color-text-subtle)] whitespace-nowrap">
                Custom Minute:
              </span>
              <input
                type="range"
                min="1"
                max="30"
                value={selectedMinutes}
                onChange={(e) => handleSelectDuration(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md min-w-[50px] text-center border border-amber-300">
                {selectedMinutes} m
              </span>
            </div>
          </div>

          {/* Central Circular Progress Clock */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[var(--color-surface-subtle)] fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-amber-500 fill-none transition-all duration-1000 ease-linear"
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Digital Time Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] font-mono">
                  {minutesLeft.toString().padStart(2, '0')}:{secondsLeft.toString().padStart(2, '0')}
                </div>
                <div className="text-xs font-semibold text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
                  {isActive ? '🔥 Deep Study Mode' : sessionCompleted ? '🎉 Goal Achieved!' : 'Ready To Study'}
                </div>
                {sessionCompleted && (
                  <div className="text-[11px] text-green-700 font-bold mt-1 bg-green-100 px-2 py-0.5 rounded-full border border-green-300">
                    +{selectedMinutes * 4} XP Logged
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white scale-102'
              }`}
            >
              <span>{isActive ? '⏸️ Pause Timer' : sessionCompleted ? '🔄 Study Again' : '▶️ Begin Study'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 rounded-xl font-semibold text-xs border border-[var(--color-border)] bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface)] text-[var(--color-text-main)] transition-colors"
            >
              ⏮️ Reset
            </button>

            <button
              type="button"
              onClick={handleAddOneMinute}
              disabled={secondsRemaining + 60 > 30 * 60}
              className="px-3.5 py-3 rounded-xl font-semibold text-xs border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Add 1 minute (strictly capped at 30 minutes)"
            >
              +1 Min (Max 30m)
            </button>
          </div>

          {/* Audio & Ambience Settings */}
          <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1 hover:text-[var(--color-text-main)]"
              >
                <span>{soundEnabled ? '🔔 Chime On' : '🔕 Chime Muted'}</span>
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setAmbientSound(ambientSound === 'tick' ? 'none' : 'tick')}
                className="hover:text-[var(--color-text-main)]"
              >
                <span>{ambientSound === 'tick' ? '⏰ Metronome Tick On' : '🔇 Quiet Clock'}</span>
              </button>
            </div>

            <span className="text-[11px] text-[var(--color-text-subtle)]">
              Automatically logs focus minutes to Progress Tracker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
