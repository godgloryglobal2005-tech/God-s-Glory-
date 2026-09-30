import React, { useState } from 'react';
import { TUTOR_PERSONAS, TutorPersona } from '../services/tutorPersonaService';
import CloseIcon from './icons/CloseIcon';

interface TutorPersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePersonaId: string;
  onSelectPersona: (persona: TutorPersona) => void;
}

export const TutorPersonaModal: React.FC<TutorPersonaModalProps> = ({
  isOpen,
  onClose,
  activePersonaId,
  onSelectPersona
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Faculty Fellows' },
    { id: 'stem', label: 'STEM & Mathematics' },
    { id: 'consumer', label: 'Home Economics & Life Sciences' },
    { id: 'business', label: 'Business Studies & Economics' },
    { id: 'humanities', label: 'Humanities & Languages' },
    { id: 'primary', label: 'Early Childhood & Primary' }
  ];

  const filteredPersonas = TUTOR_PERSONAS.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'stem') return p.id === 'uyi-glory' || p.id === 'farouk-sanusi';
    if (activeCategory === 'consumer') return p.id === 'elizabeth-adebayo';
    if (activeCategory === 'business') return p.id === 'chukwuemeka-okonkwo';
    if (activeCategory === 'humanities') return p.id === 'emmanuel-mensah';
    if (activeCategory === 'primary') return p.id === 'grace-nnamdi';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-subtle)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-accent)] uppercase tracking-wider">
              <span>God's Glory Tutors</span>
              <span aria-hidden="true">·</span>
              <span>Academic Mentorship Council</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text-main)]">
              Select Your Subject-Matter Expert Persona
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
              Choose the dedicated scholar whose teaching voice, pedagogical style, and discipline expertise will guide your solutions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Close dialog"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)]/60 flex items-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Persona Cards Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPersonas.map(persona => {
              const isSelected = persona.id === activePersonaId;

              return (
                <div
                  key={persona.id}
                  className={`rounded-xl border transition-all p-5 flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20 shadow-md'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Avatar + Title */}
                    <div className="flex items-start gap-3.5">
                      <div className={`w-13 h-13 rounded-xl ${persona.avatarBg} text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm border ${persona.avatarBorder} shrink-0`}>
                        {persona.avatarInitials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-base font-bold text-[var(--color-text-main)] truncate">
                            {persona.name}
                          </h3>
                          {isSelected && (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md shrink-0">
                              Active Persona
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[var(--color-text-accent)] mt-0.5">
                          {persona.title}
                        </p>
                        <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                          {persona.role}
                        </p>
                      </div>
                    </div>

                    {/* Meta summary */}
                    <div className="pt-1 text-xs text-[var(--color-text-subtle)] space-y-1">
                      <div className="font-medium text-[var(--color-text-main)] line-clamp-2">
                        {persona.specialization}
                      </div>
                      <p className="italic text-[var(--color-text-muted)] text-[11px] border-l-2 border-amber-400 pl-2 mt-1">
                        "{persona.quote}"
                      </p>
                    </div>

                    {/* Key Strengths */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold tracking-wider text-[var(--color-text-subtle)] uppercase">
                        Teaching Highlights & Mastery
                      </span>
                      <ul className="text-xs text-[var(--color-text-muted)] space-y-0.5">
                        {persona.strengths.slice(0, 3).map((strength, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <span className="text-amber-500 font-bold">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[var(--color-text-subtle)]">
                      {persona.recommendedLevels.map(lvl => lvl).join(' · ')}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectPersona(persona);
                        onClose();
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-[var(--color-surface-subtle)] hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-text-main)] border border-[var(--color-border)]'
                      }`}
                    >
                      <span>{isSelected ? '✓ Currently Guiding You' : 'Select This Tutor'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3.5 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>Your selected tutor shapes the pedagogical voice, explanations, and feedback style in every session.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-semibold hover:bg-[var(--color-surface)] text-[var(--color-text-main)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorPersonaModal;
