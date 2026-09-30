
import React, { useState, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, VoiceGender } from '../services/voiceService';
import { COUNTRIES, getCountryByCode, setActiveCountryCode, getActiveCountryCode } from '../services/countryCurriculumService';
import { getCurrentUser, updateUserProfile } from '../services/authService';

interface SettingsModalProps {
  onClose: () => void;
  onThemeChange: (themeName: string) => void;
  onCountryChange?: (countryCode: string) => void;
}

const themes = [
  { name: 'glory', label: 'Glory Gold', color: '#D97706' },
  { name: 'royalNavy', label: 'Royal Navy', color: '#0A192F' },
  { name: 'sky', label: 'Sky', color: '#0EA5E9' },
  { name: 'mint', label: 'Mint', color: '#22C55E' },
  { name: 'indigo', label: 'Indigo', color: '#6366F1' },
  { name: 'grape', label: 'Grape', color: '#a881ff' },
  { name: 'rose', label: 'Rose', color: '#F43F5E' },
  { name: 'dark', label: 'Dark', color: '#1F2937' },
  { name: 'blue', label: 'Blue', color: '#3B82F6' },
  { name: 'orange', label: 'Orange', color: '#F97316' },
  { name: 'cyan', label: 'Cyan', color: '#06B6D4' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onThemeChange, onCountryChange }) => {
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('female');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => getActiveCountryCode());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const currentUser = getCurrentUser();

  useEffect(() => {
    const current = getVoiceSettings();
    setVoiceGender(current.gender);
    if (currentUser?.country) {
      setSelectedCountryCode(currentUser.country);
    }
    if (currentUser?.phoneNumber) {
      setPhoneNumber(currentUser.phoneNumber);
    }
  }, []);

  const handleGenderChange = (gender: VoiceGender) => {
    setVoiceGender(gender);
    const current = getVoiceSettings();
    saveVoiceSettings({ ...current, gender, voiceURI: '' });
  };

  const handleCountrySelection = (code: string) => {
    setSelectedCountryCode(code);
    setActiveCountryCode(code);
    const c = getCountryByCode(code);
    if (currentUser) {
      updateUserProfile(currentUser.email, { country: code, curriculum: c.curriculumName });
    }
    if (onCountryChange) {
      onCountryChange(code);
    }
    setSaveStatus('Country and curriculum updated!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleSavePhone = () => {
    if (currentUser) {
      updateUserProfile(currentUser.email, { phoneNumber });
      setSaveStatus('Phone number saved!');
      setTimeout(() => setSaveStatus(''), 2500);
    }
  };

  const handleThemeClick = (themeName: string) => {
    onThemeChange(themeName);
  };

  const activeCountry = getCountryByCode(selectedCountryCode);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="bg-[var(--color-surface)] rounded-xl shadow-2xl p-6 w-full max-w-md m-4 border border-[var(--color-border)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="settings-title" className="text-xl font-bold text-[var(--color-text-main)] mb-4 text-center">
          App Settings & Preferences
        </h2>

        {/* Country & National / Worldwide Curriculum Selection */}
        <div className="mb-6 bg-[var(--color-surface-subtle)] p-4 rounded-lg border border-[var(--color-border)]">
          <label className="block text-sm font-bold text-[var(--color-text-main)] mb-1 flex items-center gap-1.5">
            <span>🌍</span> Country & Curriculum System:
          </label>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            Calibrates primary school grades, secondary subjects, exam boards, and teaching examples.
          </p>
          <select
            value={selectedCountryCode}
            onChange={(e) => handleCountrySelection(e.target.value)}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2.5 text-xs text-[var(--color-text-main)] font-semibold focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} — {c.curriculumName}
              </option>
            ))}
          </select>
          <div className="mt-2 text-[11px] text-[var(--color-accent)] font-semibold flex items-center justify-between">
            <span>Active: {activeCountry.name}</span>
            <span>Dial: {activeCountry.dialCode}</span>
          </div>

          {/* Phone number config for logged in users */}
          {currentUser && (
            <div className="mt-3 pt-3 border-t border-[var(--color-border)]/70">
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
                📱 Registered Phone Number:
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="e.g. +234 801 234 5678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2 text-xs text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSavePhone}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold px-3 py-2 rounded-md transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {saveStatus && (
            <p className="text-xs text-emerald-600 font-bold mt-2 text-center animate-fade-in">
              ✓ {saveStatus}
            </p>
          )}
        </div>

        {/* Read Aloud Voice Selection */}
        <div className="mb-6 bg-[var(--color-surface-subtle)] p-4 rounded-lg border border-[var(--color-border)]">
          <label className="block text-sm font-bold text-[var(--color-text-main)] mb-2 flex items-center gap-1.5">
            <span>🎙️</span> Voice Notes & Read Aloud Voice:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                voiceGender === 'female'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <span className="text-lg">👩</span>
              <span>Female Voice</span>
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                voiceGender === 'male'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <span className="text-lg">👨</span>
              <span>Male Voice</span>
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('auto')}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                voiceGender === 'auto'
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <span className="text-lg">⚡</span>
              <span>System Auto</span>
            </button>
          </div>
        </div>

        {/* Theme Palette Selection */}
        <h3 className="text-sm font-bold text-[var(--color-text-main)] mb-3">
          🎨 Theme Color Palette
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeClick(theme.name)}
              className="flex flex-col items-center justify-center p-2.5 rounded-lg border-2 border-transparent hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-subtle)] transition-all focus:outline-none"
              aria-label={`Select ${theme.label} theme`}
            >
              <div
                className="w-9 h-9 rounded-full mb-1.5 border border-black/10 shadow-sm"
                style={{ backgroundColor: theme.color }}
              ></div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)] text-center">{theme.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center pt-3 border-t border-[var(--color-border)]">
          <button 
            onClick={onClose} 
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
