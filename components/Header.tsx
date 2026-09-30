import React, { useState, useEffect } from 'react';
import { User } from '../types';
import AppIcon from './icons/AppIcon';
import LinkIcon from './icons/LinkIcon';
import SettingsIcon from './icons/SettingsIcon';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

interface HeaderProps {
    user: User | null;
    currentView?: 'app' | 'admin';
    onLoginClick: () => void;
    onSignUpClick: () => void;
    onLogout: () => void;
    onAdminClick: () => void;
    onLogoClick: () => void;
    onHistoryClick: () => void;
    onClearHistory: () => void;
    onCopyLink: () => void;
    isLinkCopied: boolean;
    onCopyAllCode: () => void;
    isCodeCopied: boolean;
    onSettingsClick: () => void;
    onTutorClick?: () => void;
    onApkClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  currentView = 'app',
  onLoginClick, 
  onSignUpClick, 
  onLogout, 
  onAdminClick, 
  onLogoClick, 
  onHistoryClick, 
  onClearHistory, 
  onCopyLink, 
  isLinkCopied, 
  onCopyAllCode,
  isCodeCopied,
  onSettingsClick,
  onTutorClick,
  onApkClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Disable body scroll when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset scroll on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  const MobileMenu = () => (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
      
      {/* Menu Panel */}
      <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-[var(--color-surface)] shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h2 className="font-bold text-[var(--color-text-main)]">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-[var(--color-surface-hover)]">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {onTutorClick && (
            <button 
              onClick={() => handleLinkClick(onTutorClick)} 
              className="w-full text-left font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 p-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <span>🎓</span>
              <span>Faculty Tutor Personas</span>
            </button>
          )}
          {onApkClick && (
            <button 
              onClick={() => handleLinkClick(onApkClick)} 
              className="w-full text-left font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 p-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <span>🤖</span>
              <span>Install Android App (.APK)</span>
            </button>
          )}
          {user ? (
            <>
              <div className="px-4 py-2.5 text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)]/50 mb-2 bg-[var(--color-surface-subtle)] rounded-lg">
                <span className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider block font-bold">Logged in Student:</span>
                <strong className="text-[var(--color-text-main)] text-sm block mt-0.5">{user.fullName || user.email.split('@')[0]}</strong>
                <span className="text-xs font-mono text-[var(--color-text-subtle)]">{user.email}</span>
              </div>
              {currentView === 'admin' ? (
                <button onClick={() => handleLinkClick(onLogoClick)} className="w-full text-left font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 p-3 rounded-md transition-colors flex items-center gap-2">
                  <span>← Back to Personal App</span>
                </button>
              ) : (
                user.isAdmin && (
                  <button onClick={() => handleLinkClick(onAdminClick)} className="w-full text-left font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] p-3 rounded-md transition-colors">Admin Panel</button>
                )
              )}
              <button onClick={() => handleLinkClick(onHistoryClick)} className="w-full text-left font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] p-3 rounded-md transition-colors">View History</button>
              <button onClick={() => handleLinkClick(onClearHistory)} className="w-full text-left font-medium text-red-700 hover:bg-red-100 p-3 rounded-md transition-colors">Clear History</button>
              <button onClick={() => handleLinkClick(onLogout)} className="w-full mt-4 text-left font-medium bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white p-3 rounded-md transition-colors">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => handleLinkClick(onLoginClick)} className="w-full text-left font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] p-3 rounded-md transition-colors">Login</button>
              <button onClick={() => handleLinkClick(onSignUpClick)} className="w-full mt-2 text-left font-medium bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white p-3 rounded-md transition-colors">Sign Up</button>
            </>
          )}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-[var(--color-surface)]/80 backdrop-blur-sm sticky top-0 z-30 border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div onClick={onLogoClick} className="cursor-pointer flex items-center gap-3 group" title="Return to Main App">
            <AppIcon className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-105 transition-transform" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[var(--color-text-main)] flex items-center gap-1.5">
                God's Glory <span className="font-serif italic text-[var(--color-accent)]">TUTORS</span>
              </h1>
              <p className="text-[10px] md:text-xs text-[var(--color-text-subtle)] font-medium tracking-wide uppercase">
                {currentView === 'admin' ? '🛡️ Admin Portal Mode' : 'Academic Excellence & World Curriculum'}
              </p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] hover:bg-[var(--color-surface-hover)] transition-colors">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {onTutorClick && (
              <button 
                onClick={onTutorClick} 
                className="text-xs font-bold text-amber-900 bg-amber-100/90 hover:bg-amber-200 border border-amber-300/80 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Select Academic Tutor Persona"
              >
                <span>🎓</span>
                <span className="hidden lg:inline">Faculty Tutors</span>
              </button>
            )}

            {onApkClick && (
              <button 
                onClick={onApkClick} 
                className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Install Android App (.APK)"
              >
                <span>🤖</span>
                <span className="hidden sm:inline">Android APK</span>
              </button>
            )}

            <button onClick={onSettingsClick} className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] hover:bg-[var(--color-surface-hover)] transition-colors" title="App Settings">
              <SettingsIcon className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button onClick={onCopyLink} className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] hover:bg-[var(--color-surface-hover)] transition-colors" title="Copy app link to share">
                <LinkIcon className="w-5 h-5" />
              </button>
              {isLinkCopied && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs bg-[var(--color-text-main)] text-[var(--color-surface)] whitespace-nowrap py-1 px-3 rounded-md animate-fade-in-out">
                  Link Copied!
                </div>
              )}
            </div>
            
            {user ? (
              <>
                <div className="flex items-center gap-2 border-l border-[var(--color-border)] ml-2 pl-4">
                  <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs font-bold text-[var(--color-text-main)] truncate max-w-[200px]">
                      👤 {user.fullName || user.email.split('@')[0]}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-subtle)] font-mono truncate max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                  {currentView === 'admin' ? (
                    <button 
                      onClick={onLogoClick} 
                      className="text-xs font-bold bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                      title="Return to your personal app usage"
                    >
                      <span>←</span>
                      <span>Personal App</span>
                    </button>
                  ) : (
                    user.isAdmin && (
                      <button 
                        onClick={onAdminClick} 
                        className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1 shadow-2xs"
                        title="App Creator & Admin Portal"
                      >
                        <span>👑</span>
                        <span>Creator Admin</span>
                      </button>
                    )
                  )}
                  <button onClick={onHistoryClick} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] transition-colors p-2" title="View search history">History</button>
                  <button onClick={onClearHistory} className="text-sm font-medium text-red-700 hover:text-red-500 transition-colors p-2" title="Clear search history">Clear</button>
                  <button onClick={onLogout} className="text-sm font-medium bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-2 px-3 rounded-md transition-colors">Logout</button>
                </div>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-accent)] transition-colors px-2 sm:px-3 py-2">Login</button>
                <button onClick={onSignUpClick} className="text-sm font-medium bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-2 px-3 rounded-md transition-colors">Sign Up</button>
              </>
            )}
          </div>
        </div>
        <style>{`
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
            10% { opacity: 1; transform: translateY(0) translateX(-50%); }
            90% { opacity: 1; transform: translateY(0) translateX(-50%); }
            100% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 2s ease-in-out forwards;
          }
        `}</style>
      </header>
      <MobileMenu />
    </>
  );
};

export default Header;
