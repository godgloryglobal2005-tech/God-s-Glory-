import React, { useState, useCallback, useEffect } from 'react';
import { Subject, ImagePart, SolutionType, User, AudienceLevel, HistoryItem, Announcement, ContentPart } from './types';
import { solveProblem } from './services/geminiService';
import * as authService from './services/authService';
import * as announcementService from './services/announcementService';
import { getActiveCountryCode, getCountryByCode } from './services/countryCurriculumService';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import AuthModal from './components/AuthModal';
import AdminPage from './components/AdminPage';
import QuizView from './components/QuizView';
import ScoreboardView from './components/ScoreboardView';
import TrophyIcon from './components/icons/TrophyIcon';
import WelcomeModal from './components/WelcomeModal';
import SettingsModal from './components/SettingsModal';
import HistoryModal from './components/HistoryModal';
import TutorPersonaModal from './components/TutorPersonaModal';
import ErrorBoundary from './components/ErrorBoundary';
import { getActivePersona, setActivePersona, TutorPersona } from './services/tutorPersonaService';
import MegaphoneIcon from './components/icons/MegaphoneIcon';
import CloseIcon from './components/icons/CloseIcon';
import AndroidApkModal from './components/AndroidApkModal';

const themes: Record<string, Record<string, string>> = {
  glory: {
    '--color-bg': '#F8FAFC',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#F1F5F9',
    '--color-surface-hover': '#FEF3C7',
    '--color-border': '#E2E8F0',
    '--color-text-main': '#0A192F',
    '--color-text-secondary': '#1E3A8A',
    '--color-text-accent': '#D97706',
    '--color-text-muted': '#475569',
    '--color-text-subtle': '#64748B',
    '--color-accent': '#D97706',
    '--color-accent-hover': '#B45309',
    '--color-accent-disabled': '#FCD34D',
    '--color-icon-primary': '#D97706',
  },
  royalNavy: {
    '--color-bg': '#0A192F',
    '--color-surface': '#112240',
    '--color-surface-subtle': '#0F172A',
    '--color-surface-hover': '#1E293B',
    '--color-border': '#233554',
    '--color-text-main': '#F8FAFC',
    '--color-text-secondary': '#FCD34D',
    '--color-text-accent': '#F59E0B',
    '--color-text-muted': '#94A3B8',
    '--color-text-subtle': '#64748B',
    '--color-accent': '#F59E0B',
    '--color-accent-hover': '#D97706',
    '--color-accent-disabled': '#78350F',
    '--color-icon-primary': '#F59E0B',
  },
  sky: {
    '--color-bg': '#F0F9FF',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#F0F9FF',
    '--color-surface-hover': '#E0F2FE',
    '--color-border': '#BAE6FD',
    '--color-text-main': '#082F49',
    '--color-text-secondary': '#0369A1',
    '--color-text-accent': '#0EA5E9',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#0EA5E9',
    '--color-accent-hover': '#0284C7',
    '--color-accent-disabled': '#7DD3FC',
    '--color-icon-primary': '#0EA5E9',
  },
  mint: {
    '--color-bg': '#F0FDF4',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#F0FDF4',
    '--color-surface-hover': '#DCFCE7',
    '--color-border': '#BBF7D0',
    '--color-text-main': '#14532D',
    '--color-text-secondary': '#166534',
    '--color-text-accent': '#22C55E',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#22C55E',
    '--color-accent-hover': '#16A34A',
    '--color-accent-disabled': '#86EFAC',
    '--color-icon-primary': '#22C55E',
  },
  rose: {
    '--color-bg': '#FFF1F2',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#FFF1F2',
    '--color-surface-hover': '#FFE4E6',
    '--color-border': '#FECDD3',
    '--color-text-main': '#881337',
    '--color-text-secondary': '#9F1239',
    '--color-text-accent': '#F43F5E',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#F43F5E',
    '--color-accent-hover': '#E11D48',
    '--color-accent-disabled': '#FDA4AF',
    '--color-icon-primary': '#F43F5E',
  },
  indigo: {
    '--color-bg': '#EEF2FF',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#EEF2FF',
    '--color-surface-hover': '#E0E7FF',
    '--color-border': '#C7D2FE',
    '--color-text-main': '#312E81',
    '--color-text-secondary': '#3730A3',
    '--color-text-accent': '#6366F1',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#6366F1',
    '--color-accent-hover': '#4F46E5',
    '--color-accent-disabled': '#A5B4FC',
    '--color-icon-primary': '#6366F1',
  },
  dark: {
    '--color-bg': '#111827',
    '--color-surface': '#1F2937',
    '--color-surface-subtle': '#111827',
    '--color-surface-hover': '#374151',
    '--color-border': '#4B5563',
    '--color-text-main': '#F3F4F6',
    '--color-text-secondary': '#D1D5DB',
    '--color-text-accent': '#60A5FA',
    '--color-text-muted': '#9CA3AF',
    '--color-text-subtle': '#6B7280',
    '--color-accent': '#60A5FA',
    '--color-accent-hover': '#3B82F6',
    '--color-accent-disabled': '#93C5FD',
    '--color-icon-primary': '#60A5FA',
  },
  blue: {
    '--color-bg': '#EFF6FF',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#EFF6FF',
    '--color-surface-hover': '#DBEAFE',
    '--color-border': '#BFDBFE',
    '--color-text-main': '#1E3A8A',
    '--color-text-secondary': '#1D4ED8',
    '--color-text-accent': '#3B82F6',
    '--color-text-muted': '#6B7280',
    '--color-text-subtle': '#9CA3AF',
    '--color-accent': '#3B82F6',
    '--color-accent-hover': '#2563EB',
    '--color-accent-disabled': '#93C5FD',
    '--color-icon-primary': '#3B82F6',
  },
  navy: {
    '--color-bg': '#F0F4F8',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#F0F4F8',
    '--color-surface-hover': '#E2E8F0',
    '--color-border': '#CBD5E1',
    '--color-text-main': '#1E293B',
    '--color-text-secondary': '#334155',
    '--color-text-accent': '#4F46E5',
    '--color-text-muted': '#64748B',
    '--color-text-subtle': '#94A3B8',
    '--color-accent': '#4F46E5',
    '--color-accent-hover': '#4338CA',
    '--color-accent-disabled': '#818CF8',
    '--color-icon-primary': '#4F46E5',
  },
  orange: {
    '--color-bg': '#FFF7ED',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#FFF7ED',
    '--color-surface-hover': '#FFEDD5',
    '--color-border': '#FED7AA',
    '--color-text-main': '#7C2D12',
    '--color-text-secondary': '#9A3412',
    '--color-text-accent': '#F97316',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#F97316',
    '--color-accent-hover': '#EA580C',
    '--color-accent-disabled': '#FDBA74',
    '--color-icon-primary': '#F97316',
  },
  cyan: {
    '--color-bg': '#ECFEFF',
    '--color-surface': '#FFFFFF',
    '--color-surface-subtle': '#ECFEFF',
    '--color-surface-hover': '#CFFAFE',
    '--color-border': '#A5F3FC',
    '--color-text-main': '#155E75',
    '--color-text-secondary': '#164E63',
    '--color-text-accent': '#06B6D4',
    '--color-text-muted': '#71717A',
    '--color-text-subtle': '#A1A1AA',
    '--color-accent': '#06B6D4',
    '--color-accent-hover': '#0891B2',
    '--color-accent-disabled': '#67E8F9',
    '--color-icon-primary': '#06B6D4',
  },
  grape: {
    '--color-bg': '#121019',
    '--color-surface': '#1d1b26',
    '--color-surface-subtle': '#121019',
    '--color-surface-hover': '#2a2634',
    '--color-border': '#38324a',
    '--color-text-main': '#f0eef7',
    '--color-text-secondary': '#c8c2e0',
    '--color-text-accent': '#a881ff',
    '--color-text-muted': '#9089a5',
    '--color-text-subtle': '#756f8a',
    '--color-accent': '#a881ff',
    '--color-accent-hover': '#8e63e6',
    '--color-accent-disabled': '#6a569e',
    '--color-icon-primary': '#a881ff',
  },
};


const App: React.FC = () => {
  const [subject, setSubject] = useState<Subject>(Subject.ComputerScience);
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>(AudienceLevel.University);
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<{ url: string; part: ImagePart | null }>({ url: '', part: null });
  const [solution, setSolution] = useState<SolutionType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for curriculum
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [view, setView] = useState<'app' | 'admin'>('app');
  const [mode, setMode] = useState<'solver' | 'quiz' | 'scoreboard'>('solver');
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isPortableHTMLCopied, setIsPortableHTMLCopied] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [activePersona, setActivePersonaState] = useState<TutorPersona>(() => getActivePersona());

  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null);
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false);


  const applyTheme = useCallback((themeName: string) => {
    const theme = themes[themeName] || themes.glory;
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);
  
  const handleThemeChange = useCallback((themeName: string) => {
    applyTheme(themeName);
    localStorage.setItem('app-theme', themeName);
  }, [applyTheme]);

  const executeSolve = useCallback((
    targetSubject: Subject,
    targetPrompt: string,
    targetImagePart: ImagePart | null,
    targetAudienceLevel: AudienceLevel,
    targetTopic?: string,
    targetSubTopic?: string,
    targetYear?: string,
    targetSemester?: string,
  ) => {
    if (!currentUser) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      setError('Please sign up or log in first. Operating the problem solver and academic features requires an active account.');
      return;
    }

    if (!targetPrompt.trim() && !targetImagePart) {
      setError('Please enter a question or upload an image.');
      return;
    }
    setError(null);
    setSolution([{ type: 'text', content: '' }]); // Initialize for streaming
    setIsLoading(true);

    const countryCode = currentUser?.country || getActiveCountryCode();
    const countryConfig = getCountryByCode(countryCode);

    solveProblem(
      targetSubject,
      targetPrompt,
      targetImagePart,
      targetAudienceLevel,
      (textChunk) => { // onUpdate callback
        setSolution(prevSolution => {
          const newSolution = [...prevSolution];
          let lastPart = newSolution[newSolution.length - 1];
          if (lastPart && lastPart.type === 'text') {
            (lastPart as { type: 'text', content: string }).content += textChunk;
          } else {
            newSolution.push({ type: 'text', content: textChunk });
          }
          return newSolution;
        });
      },
      (finalSolution) => { // onComplete callback
        setSolution(finalSolution);
        setIsLoading(false);
        // Add to history safely if logged in
        if (currentUser) {
          try {
            const historyContext = [targetTopic, targetSubTopic].filter(Boolean).join(' - ');
            const historyPrompt = historyContext
              ? `[${historyContext}] ${targetPrompt.trim() || '[Image-based question]'}`
              : (targetPrompt.trim() || '[Image-based question]');

            authService.addHistoryItem(currentUser.email, {
              subject: targetSubject,
              audienceLevel: targetAudienceLevel,
              prompt: historyPrompt,
              solution: finalSolution,
            });
          } catch (historyErr) {
            console.warn("Could not save to history:", historyErr);
          }
        }
      },
      (errorMessage) => { // onError callback
        setError(`Failed to get a solution. ${errorMessage}`);
        setIsLoading(false);
      },
      targetTopic,
      targetSubTopic,
      targetYear,
      targetSemester,
      countryConfig.name,
      countryConfig.curriculumName,
      activePersona
    );
  }, [currentUser, activePersona]);

  useEffect(() => {
     // Apply saved theme or default to God's Glory Signature Navy & Gold theme
    const savedTheme = localStorage.getItem('app-theme') || 'glory';
    applyTheme(savedTheme);

    // Check for logged in user
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      // Direct visitor to sign up or log in before performing further operations
      setIsAuthModalOpen(true);
      setAuthMode('signup');
    }

    // Check for announcements with server fetch
    const updateAnnouncements = (list: Announcement[]) => {
      if (list.length > 0) {
        const latest = list[0];
        setLatestAnnouncement(latest);
        const dismissedId = sessionStorage.getItem('dismissedAnnouncementId');
        if (dismissedId === latest.id) {
          setIsAnnouncementDismissed(true);
        } else {
          setIsAnnouncementDismissed(false);
        }
      } else {
        setLatestAnnouncement(null);
      }
    };

    // Load locally cached first, then fetch live from server
    updateAnnouncements(announcementService.getAnnouncements());
    announcementService.fetchAnnouncements().then(updateAnnouncements).catch(() => {});
    
    // Initialize state from URL query and hash parameters to support published links & direct searches
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const getParam = (key: string) => searchParams.get(key) || hashParams.get(key);

    const modeParam = getParam('mode');
    if (modeParam && ['solver', 'quiz', 'scoreboard'].includes(modeParam)) {
      setMode(modeParam as 'solver' | 'quiz' | 'scoreboard');
    }

    const viewParam = getParam('view');
    if (viewParam === 'admin') {
      if (user?.isAdmin) {
        setView('admin');
      } else {
        setAuthMode('login');
        setIsAuthModalOpen(true);
      }
    }

    let initialSubject = subject;
    const subjectParam = getParam('subject');
    if (subjectParam && Object.values(Subject).includes(subjectParam as Subject)) {
      initialSubject = subjectParam as Subject;
      setSubject(initialSubject);
    }

    let initialLevel = audienceLevel;
    const levelParam = getParam('level');
    if (levelParam && Object.values(AudienceLevel).includes(levelParam as AudienceLevel)) {
      initialLevel = levelParam as AudienceLevel;
      setAudienceLevel(initialLevel);
    }
    
    const promptParam = getParam('prompt') || getParam('q') || getParam('search') || getParam('query') || getParam('problem');
    if (promptParam) {
      setPrompt(promptParam);
    }
    
    const yearParam = getParam('year');
    if (yearParam) {
      setYear(yearParam);
    }

    const semesterParam = getParam('semester');
    if (semesterParam) {
      setSemester(semesterParam);
    }
    
    const topicParam = getParam('topic');
    if (topicParam) {
      setTopic(topicParam);
    }
    
    const subTopicParam = getParam('subTopic');
    if (subTopicParam) {
      setSubTopic(subTopicParam);
    }

    // If query or prompt was passed in the URL (e.g. from published link search), trigger solve automatically
    if (promptParam && promptParam.trim()) {
      const targetSub = initialSubject;
      const targetLvl = initialLevel;
      const targetPrm = promptParam;
      const targetYr = yearParam || undefined;
      const targetSem = semesterParam || undefined;
      const targetTop = topicParam || undefined;
      const targetSubTop = subTopicParam || undefined;

      setTimeout(() => {
        executeSolve(targetSub, targetPrm, null, targetLvl, targetTop, targetSubTop, targetYr, targetSem);
      }, 250);
    }

    // Logic for welcome modal
    if (view === 'app') { // Only check for welcome modal on the main app view
        const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomeModal');
        if (!hasSeenWelcome) {
            setIsWelcomeModalOpen(true);
        }
    }
  }, [applyTheme, view]); // Re-run when view changes to fetch new announcements
  
  // This effect updates the URL hash params whenever the shared state changes.
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('mode', mode);
    params.set('subject', subject);
    params.set('level', audienceLevel);

    // Only add non-empty parameters for a cleaner URL
    if (prompt.trim()) params.set('prompt', prompt);
    if (year) params.set('year', year);
    if (semester) params.set('semester', semester);
    if (topic) params.set('topic', topic);
    if (subTopic) params.set('subTopic', subTopic);

    // Using the URL hash is more robust in sandboxed environments (like blob URLs)
    // where manipulating `window.location.search` can cause a SecurityError.
    const newHash = `#${params.toString()}`;

    // Update the URL hash without creating a new entry in browser history.
    // A try-catch block is used to prevent crashes in highly restrictive environments.
    try {
      if (window.location.hash !== newHash) {
        // Passing just the hash to replaceState should only update the fragment identifier
        window.history.replaceState(null, '', newHash);
      }
    } catch (e) {
      console.warn("Could not update URL state via replaceState. Link sharing might not work.", e);
    }
  }, [mode, subject, audienceLevel, prompt, year, semester, topic, subTopic]);
  
  useEffect(() => {
    // When switching modes, clear previous results
    setSolution([]);
    setError(null);
  }, [mode]);

  const handleImageChange = useCallback((dataUrl: string | null) => {
    if (!dataUrl) {
      setImage({ url: '', part: null });
      return;
    }
    const mimeTypeMatch = dataUrl.match(/^data:(image\/[a-zA-Z]+);base64,/);
    if (!mimeTypeMatch) {
      setError('Invalid image format. Please use PNG, JPEG, or WEBP.');
      setImage({ url: '', part: null });
      return;
    }
    const mimeType = mimeTypeMatch[1];
    const base64Data = dataUrl.substring(dataUrl.indexOf(',') + 1);
    
    setImage({
      url: dataUrl,
      part: {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    });
    setError(null);
  }, []);

  const handleSubmit = () => {
    if (!currentUser) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      setError('Please sign up or log in first. Operating the problem solver requires an account.');
      return;
    }
    executeSolve(subject, prompt, image.part, audienceLevel, topic, subTopic, year, semester);
  };
  
  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };
  
  const handleSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  // Maintain presence heartbeat for active session tracking
  useEffect(() => {
    if (!currentUser?.email) return;
    authService.sendHeartbeat(currentUser.email).catch(() => {});
    const interval = setInterval(() => {
      authService.sendHeartbeat(currentUser.email).catch(() => {});
    }, 25000);
    return () => clearInterval(interval);
  }, [currentUser?.email]);

  const handleLogout = async () => {
    if (currentUser?.email) {
      await authService.logout(currentUser.email);
    } else {
      await authService.logout();
    }
    setCurrentUser(null);
    setView('app');
    setMode('solver');
    setSolution([]);
    setError(null);
  };

  const handleAuthSuccess = () => {
    setCurrentUser(authService.getCurrentUser());
    setIsAuthModalOpen(false);
  };

  const handleDownloadHistory = () => {
    if (!currentUser) return;
    const history = authService.getHistory(currentUser.email);
    if (history.length === 0) {
      alert("No history to download.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `gods_glory_tutors_history_${currentUser.email}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleClearHistory = () => {
    if (!currentUser) return;
    if (confirm("Are you sure you want to clear your entire search history? This cannot be undone.")) {
      authService.clearHistory(currentUser.email);
      setIsHistoryModalOpen(false); // Close modal if it's open
      alert("History cleared.");
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSubject(item.subject);
    setAudienceLevel(item.audienceLevel);
    setPrompt(item.prompt); 
    setSolution(item.solution);
    setIsHistoryModalOpen(false);
    setMode('solver');
    setError(null);
    window.scrollTo(0, 0);
  };
  
  const handleCopyPortableHTML = useCallback(async () => {
    try {
      const { generatePortableHTML } = await import('./services/codeExportService');
      const htmlContent = generatePortableHTML();
      await navigator.clipboard.writeText(htmlContent);
      setIsPortableHTMLCopied(true);
      setTimeout(() => setIsPortableHTMLCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy portable HTML:', error);
    }
  }, []);

  const handleCopyAllCode = useCallback(async () => {
    try {
      const { fetchAllSourceFiles, copyAllCodeToClipboard } = await import('./services/codeExportService');
      const files = fetchAllSourceFiles();
      const success = await copyAllCodeToClipboard(files);
      if (success) {
        setIsCodeCopied(true);
        setTimeout(() => setIsCodeCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  }, []);

  const handleCopyLink = useCallback(() => {
    const params = new URLSearchParams();
    params.set('mode', mode);
    params.set('subject', subject);
    params.set('level', audienceLevel);

    if (prompt.trim()) params.set('prompt', prompt);
    if (year) params.set('year', year);
    if (semester) params.set('semester', semester);
    if (topic) params.set('topic', topic);
    if (subTopic) params.set('subTopic', subTopic);
    
    // Construct the shareable URL from the current state.
    // This is more reliable than reading window.location.href, which might be
    // a temporary blob URL or not yet updated with the latest hash.
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shareableUrl = `${baseUrl}#${params.toString()}`;

    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareableUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(shareableUrl).then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
  }, [mode, subject, audienceLevel, prompt, year, semester, topic, subTopic]);

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
    sessionStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const handleDismissAnnouncement = () => {
    if (latestAnnouncement) {
      sessionStorage.setItem('dismissedAnnouncementId', latestAnnouncement.id);
    }
    setIsAnnouncementDismissed(true);
  };


  const renderAppContent = () => {
    if (view === 'admin' && currentUser?.isAdmin) {
      return (
        <AdminPage 
          onReturnToApp={(targetMode) => {
            if (targetMode) {
              setMode(targetMode);
            }
            setView('app');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      );
    }

    const renderCurrentMode = () => {
        switch(mode) {
            case 'solver':
                return (
                    <div className="flex flex-col lg:flex-row gap-8 flex-grow">
                        <div className="lg:w-1/2 flex flex-col">
                        <InputForm
                            subject={subject}
                            setSubject={setSubject}
                            audienceLevel={audienceLevel}
                            setAudienceLevel={setAudienceLevel}
                            prompt={prompt}
                            setPrompt={setPrompt}
                            imagePreviewUrl={image.url}
                            onImageChange={handleImageChange}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            isLoggedIn={!!currentUser}
                            onLoginClick={handleLogin}
                            year={year}
                            setYear={setYear}
                            semester={semester}
                            setSemester={setSemester}
                            topic={topic}
                            setTopic={setTopic}
                            subTopic={subTopic}
                            setSubTopic={setSubTopic}
                            activePersona={activePersona}
                            onOpenTutorModal={() => setIsTutorModalOpen(true)}
                        />
                        </div>
                        <div className="lg:w-1/2 flex flex-col">
                        <OutputDisplay
                            isLoading={isLoading}
                            solution={solution}
                            error={error}
                            isLoggedIn={!!currentUser}
                            onLoginClick={handleLogin}
                        />
                        </div>
                    </div>
                );
            case 'quiz':
                return <QuizView currentUser={currentUser} onLoginClick={handleLogin} />;
            case 'scoreboard':
                return <ScoreboardView />;
            default:
                return null;
        }
    }

    return (
      <>
        <div className="mb-6 flex justify-center p-1 bg-white/60 rounded-lg max-w-lg mx-auto shadow-sm border border-[var(--color-border)]/50">
          <button
            onClick={() => setMode('solver')}
            className={`w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${mode === 'solver' ? 'bg-[var(--color-accent)] text-white shadow' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'}`}
          >
            Problem Solver
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${mode === 'quiz' ? 'bg-[var(--color-accent)] text-white shadow' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'}`}
          >
            Quiz Fun
          </button>
           <button
            onClick={() => setMode('scoreboard')}
            className={`w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${mode === 'scoreboard' ? 'bg-[var(--color-accent)] text-white shadow' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'}`}
          >
            <TrophyIcon className="w-4 h-4" />
            Scoreboard
          </button>
        </div>
        {renderCurrentMode()}
      </>
    );
  }
  
  const MarqueeBanner = () => (
    <div
      className="bg-gradient-to-r from-[var(--color-accent-disabled)] via-[var(--color-surface)] to-[var(--color-accent-disabled)] text-[var(--color-text-secondary)] font-serif italic text-center py-2 overflow-hidden shadow-lg"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="marquee-text-container">
        <div className="marquee-text">
          <span>Jesus Loves You ❤️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>Jesus Loves You ❤️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>Jesus Loves You ❤️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>Jesus Loves You ❤️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
  
  const AnnouncementBanner = () => {
    if (!latestAnnouncement || isAnnouncementDismissed) {
        return null;
    }
    return (
        <div className="bg-[var(--color-accent)]/10 border-b-2 border-[var(--color-accent)]/20 text-[var(--color-text-secondary)]">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <MegaphoneIcon className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
                    <p className="text-sm font-medium">{latestAnnouncement.content}</p>
                </div>
                <button 
                    onClick={handleDismissAnnouncement}
                    className="p-1 rounded-full hover:bg-[var(--color-accent)]/20 transition-colors"
                    aria-label="Dismiss announcement"
                >
                    <CloseIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
  };

  const handleLogoClick = useCallback(() => {
    setView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b-2 border-[var(--color-accent)]/50 relative z-30">
        <MarqueeBanner />
      </div>

      <style>{`
          .marquee-text-container {
              width: 100%;
              overflow: hidden;
              position: relative;
          }
          .marquee-text {
              display: inline-block;
              white-space: nowrap;
              padding-left: 100%;
              animation: marquee 30s linear infinite;
          }
          .marquee-text span {
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.7);
          }
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
          }
      `}</style>
      <Header 
        user={currentUser}
        currentView={view}
        onLoginClick={handleLogin}
        onSignUpClick={handleSignup}
        onLogout={handleLogout}
        onAdminClick={() => setView('admin')}
        onLogoClick={() => setView('app')}
        onHistoryClick={() => setIsHistoryModalOpen(true)}
        onClearHistory={handleClearHistory}
        onCopyLink={handleCopyLink}
        isLinkCopied={isLinkCopied}
        onCopyAllCode={handleCopyAllCode}
        isCodeCopied={isCodeCopied}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
        onTutorClick={() => setIsTutorModalOpen(true)}
        onApkClick={() => setIsApkModalOpen(true)}
      />
      <AnnouncementBanner />
      <main className="flex-grow container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 flex flex-col">
        {renderAppContent()}
      </main>
      
      <div className="border-t-2 border-[var(--color-accent)]/50 mt-auto">
        <MarqueeBanner />
      </div>
      <Footer />

      {isAuthModalOpen && (
        <AuthModal 
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      {isWelcomeModalOpen && (
        <WelcomeModal onClose={handleCloseWelcomeModal} />
      )}
      {isSettingsModalOpen && (
        <SettingsModal 
            onClose={() => setIsSettingsModalOpen(false)}
            onThemeChange={handleThemeChange}
        />
      )}
      {isHistoryModalOpen && (
        <HistoryModal 
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            currentUser={currentUser}
            onItemSelect={handleSelectHistoryItem}
            onDownloadHistory={handleDownloadHistory}
        />
      )}
      <TutorPersonaModal
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
        activePersonaId={activePersona?.id || 'uyi-glory'}
        onSelectPersona={(persona) => {
          setActivePersona(persona.id);
          setActivePersonaState(persona);
        }}
      />
      {isApkModalOpen && (
        <AndroidApkModal onClose={() => setIsApkModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
