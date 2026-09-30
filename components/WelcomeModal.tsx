
import React from 'react';
import AppIcon from './icons/AppIcon';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[var(--color-surface)] rounded-lg shadow-2xl p-8 w-full max-w-md m-4 text-center border border-[var(--color-border)] animate-scale-up"
      >
        <div className="flex justify-center mb-6">
          <AppIcon className="w-24 h-24" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-4">
          Welcome to God's Glory Tutors
        </h2>
        <p className="text-[var(--color-text-muted)] mb-8">
          Your personal AI-powered academic partner for tackling complex problems across a universe of subjects.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 px-4 rounded-md transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-white"
          aria-label="Get Started"
        >
          Get Started
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-up {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
            animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;