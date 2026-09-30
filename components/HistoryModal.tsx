import React, { useState, useEffect } from 'react';
import { User, HistoryItem } from '../types';
import * as authService from '../services/authService';
import DownloadIcon from './icons/DownloadIcon';
import CloseIcon from './icons/CloseIcon';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onItemSelect: (item: HistoryItem) => void;
  onDownloadHistory: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, currentUser, onItemSelect, onDownloadHistory }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // This effect listens for changes to isOpen and currentUser.
  // When the modal is opened for a user, it fetches their latest history.
  // This also implicitly handles re-fetching if the history is cleared while
  // the modal remains open (though current logic closes it).
  useEffect(() => {
    if (isOpen && currentUser) {
      setHistory(authService.getHistory(currentUser.email));
    }
  }, [isOpen, currentUser]);
  
  // This effect is added to listen for storage events. If the history is cleared
  // in another tab, this modal will update its view without needing a refresh.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (currentUser && event.key === `gods_glory_tutors_history_${currentUser.email}`) {
         setHistory(authService.getHistory(currentUser.email));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUser]);

  if (!isOpen || !currentUser) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-title"
    >
      <div
        className="bg-[var(--color-surface)] rounded-lg shadow-2xl w-full max-w-2xl m-4 border border-[var(--color-border)] flex flex-col"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-[var(--color-border)] flex justify-between items-center sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur-sm z-10">
          <h2 id="history-title" className="text-xl font-bold text-[var(--color-text-main)]">
            Your History
          </h2>
          <div className="flex items-center gap-2">
            <button
                onClick={onDownloadHistory}
                className="flex items-center gap-2 text-sm font-medium bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] py-2 px-3 rounded-md transition-colors"
                title="Download History"
                aria-label="Download History"
            >
                <DownloadIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
            </button>
            <button
                onClick={onClose}
                className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] hover:bg-[var(--color-surface-hover)] transition-colors"
                aria-label="Close history view"
            >
                <CloseIcon className="w-5 h-5"/>
            </button>
          </div>
        </header>
        <main className="p-4 overflow-y-auto">
          {history.length > 0 ? (
            <ul className="space-y-3">
              {history.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onItemSelect(item)}
                    className="w-full text-left p-3 bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] rounded-lg border border-[var(--color-border)]/70 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    aria-label={`View solution for prompt: ${item.prompt}`}
                  >
                    <div className="flex justify-between items-start text-xs text-[var(--color-text-subtle)] mb-1">
                      <span className="font-semibold">{item.subject}</span>
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-[var(--color-text-main)] font-medium truncate">
                      {item.prompt}
                    </p>
                     <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Audience: {item.audienceLevel}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-[var(--color-text-muted)]">
              <p>Your history is empty.</p>
              <p className="text-sm">Start solving problems to build your history.</p>
            </div>
          )}
        </main>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HistoryModal;
