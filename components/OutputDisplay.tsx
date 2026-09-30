import React, { useRef, useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Spinner from './Spinner';
import { SolutionType, ContentPart } from '../types';
import { formatMathSymbols } from '../services/mathUtils';
import { 
  getVoiceSettings, 
  saveVoiceSettings, 
  selectVoiceByPreference, 
  VoiceGender, 
  VoiceSettings 
} from '../services/voiceService';
import DownloadIcon from './icons/DownloadIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import PauseIcon from './icons/PauseIcon';
import StopIcon from './icons/StopIcon';


interface OutputDisplayProps {
  isLoading: boolean;
  solution: SolutionType;
  error: string | null;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

// A more robust text chunker for speech synthesis
const createSpeechChunks = (text: string): string[] => {
  const MAX_CHUNK_LENGTH = 160; // A safe number of characters for most speech synthesis engines
  const idealChunkSuffixes = ['.', '!', '?', '\n', ';', ':'];
  
  const chunks: string[] = [];
  // Clean up markdown and other artifacts for a better listening experience
  let tempText = text
    // 1. Replace specific, known LaTeX symbols for better pronunciation.
    .replace(/\\Omega/g, ' Ohms ')
    .replace(/\\degree/g, ' degrees ')
    // 2. Replace remaining inline and block math expressions with a generic phrase.
    // Handles $$...$$ (block) and $...$ (inline). The `?` makes the `.*` non-greedy.
    .replace(/\$\$[\s\S]*?\$\$/g, ' a mathematical equation was presented. ')
    .replace(/\$[\s\S]*?\$/g, ' a mathematical expression was presented. ')
    // 3. General markdown and artifact cleaning.
    .replace(/(\r\n|\n|\r)/gm, " ") // Replace newlines with spaces for processing
    .replace(/\[GENERATE_IMAGE:.*?\]/g, 'An image was generated here.')
    .replace(/#+\s/g, '') // Remove markdown heading markers
    .replace(/(\*|_){1,2}/g, '') // Remove bold/italics markers
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, 'a code example was provided.'); // Replace code blocks

  while (tempText.length > 0) {
    if (tempText.length <= MAX_CHUNK_LENGTH) {
      chunks.push(tempText);
      break;
    }

    let chunkEndIndex = -1;
    
    // Try to find a natural sentence break within the max length for smoother speech
    for (const suffix of idealChunkSuffixes) {
        const index = tempText.lastIndexOf(suffix, MAX_CHUNK_LENGTH);
        if (index > chunkEndIndex) {
            chunkEndIndex = index;
        }
    }

    // If no natural break is found, find the last space to avoid cutting words
    if (chunkEndIndex === -1) {
        chunkEndIndex = tempText.lastIndexOf(' ', MAX_CHUNK_LENGTH);
    }
    
    // If there's no space (a very long word), force a cut at the max length
    if (chunkEndIndex === -1) {
        chunkEndIndex = MAX_CHUNK_LENGTH;
    }

    chunks.push(tempText.substring(0, chunkEndIndex + 1));
    tempText = tempText.substring(chunkEndIndex + 1);
  }

  return chunks.map(c => c.trim()).filter(c => c.length > 0);
};

const selectFunVoice = (availableVoices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    // 1. Prioritize non-local US English voices (often higher quality, network-based)
    const premiumUSVoice = availableVoices.find(v => v.lang === 'en-US' && !v.localService);
    if (premiumUSVoice) return premiumUSVoice;

    // 2. Prioritize non-local UK English voices
    const premiumUKVoice = availableVoices.find(v => v.lang === 'en-GB' && !v.localService);
    if (premiumUKVoice) return premiumUKVoice;

    // 3. Fallback to any US English voice
    const anyUSVoice = availableVoices.find(v => v.lang === 'en-US');
    if (anyUSVoice) return anyUSVoice;
    
    // 4. Fallback to any UK English voice
    const anyUKVoice = availableVoices.find(v => v.lang === 'en-GB');
    if (anyUKVoice) return anyUKVoice;

    // 5. Final fallback: any English voice at all, or the first available voice
    return availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0] || null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
  isLoading, 
  solution, 
  error, 
  isLoggedIn, 
  onLoginClick,
}) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [speechState, setSpeechState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const utteranceQueue = useRef<SpeechSynthesisUtterance[]>([]);
  const currentUtteranceIndex = useRef(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }
  };
  
  // Save settings when changed
  const updateVoiceSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, ...newSettings };
      saveVoiceSettings(updated);
      return updated;
    });
    // If currently speaking, stop so the new voice applies on next play
    if (speechState !== 'idle') {
      stopSpeech();
    }
  };

  // Load available voices
  useEffect(() => {
    if (!window.speechSynthesis) return;

    const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            window.speechSynthesis.onvoiceschanged = null; // We have the voices, no need to listen
        }
    };

    loadVoices();
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = null;
            window.speechSynthesis.cancel();
        }
    };
  }, []);

  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis) {
        speechSynthesis.cancel();
    }
    utteranceQueue.current = [];
    currentUtteranceIndex.current = 0;
    setSpeechState('idle');
  }, []);

  // Effect to stop speech when component unmounts or solution changes
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [solution, stopSpeech]);
  
  useEffect(() => {
      const handleBeforeUnload = () => {
          stopSpeech();
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, [stopSpeech]);

  const speakNextChunk = useCallback(() => {
    if (currentUtteranceIndex.current >= utteranceQueue.current.length) {
      setSpeechState('idle');
      return;
    }

    const utterance = utteranceQueue.current[currentUtteranceIndex.current];
    utterance.onend = () => {
      currentUtteranceIndex.current++;
      speakNextChunk();
    };
    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.error(`Speech synthesis error: ${event.error}`);
      }
      stopSpeech();
    };

    speechSynthesis.speak(utterance);
  }, [stopSpeech]);

  const handleSpeak = () => {
    if (!solution || solution.length === 0 || !window.speechSynthesis) return;

    if (speechState === 'speaking') {
      speechSynthesis.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      speechSynthesis.resume();
      setSpeechState('speaking');
    } else if (speechState === 'idle') {
      stopSpeech();
      
      const textToSpeak = solution
        .filter(part => part.type === 'text')
        .map(part => (part as { type: 'text'; content: string }).content)
        .join(' ');
        
      if (!textToSpeak.trim()) return;

      const chunks = createSpeechChunks(textToSpeak);
      if (chunks.length === 0) return;
      
      const { voice: selectedVoice, calculatedPitch } = selectVoiceByPreference(voices, voiceSettings);
      
      utteranceQueue.current = chunks.map(chunk => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        utterance.pitch = calculatedPitch; 
        utterance.rate = voiceSettings.speechRate || 1.0; 
        utterance.volume = 1.0;
        return utterance;
      });
      currentUtteranceIndex.current = 0;

      setSpeechState('speaking');
      speakNextChunk();
    }
  };
  
  const handleDownload = async () => {
    const content = outputRef.current;
    if (!content) return;

    // Temporarily increase resolution for better quality
    const scale = 2;
    const canvas = await html2canvas(content, {
      scale: scale,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim(),
      useCORS: true,
      windowWidth: content.scrollWidth,
      windowHeight: content.scrollHeight,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width / scale, canvas.height / scale],
      hotfixes: ['px_scaling'],
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Gods_Glory_Tutors_Solution.pdf');
  };

  const WelcomeMessage = () => (
    <div className="text-center text-[var(--color-text-muted)]">
      <div className="text-5xl mb-4">🧠✨📚</div>
      <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Welcome to God's Glory Tutors</h2>
      <p className="mt-2">
        Select a subject, enter your university-level question, and get a detailed solution with AI-generated visuals.
      </p>
    </div>
  );
  
  const LoginPrompt = () => (
     <div className="text-center text-[var(--color-text-muted)]">
      <div className="text-5xl mb-4">👋</div>
      <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Let's Get Started</h2>
      <p className="mt-2 mb-4">
        Please log in or sign up to begin solving complex problems with God's Glory Tutors.
      </p>
       <button
            onClick={onLoginClick}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Login / Sign Up
       </button>
    </div>
  );

  const renderContentPart = (part: ContentPart, index: number) => {
    switch (part.type) {
      case 'text':
        const formattedText = formatMathSymbols(part.content);
        const htmlContent = marked.parse(formattedText, { breaks: true, gfm: true }) as string;
        return <div key={index} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      case 'image':
        if (!part.content) {
          return (
            <div key={index} className="my-4 p-3 bg-amber-500/10 border border-amber-300/40 rounded-lg text-center">
              <span className="text-xs font-bold text-amber-800 flex items-center justify-center gap-1">
                📊 Visual Reference Diagram
              </span>
              <p className="text-xs text-[var(--color-text-muted)] italic mt-1">{part.alt}</p>
            </div>
          );
        }
        return (
          <div key={index} className="my-6 flex flex-col items-center">
            <img 
              src={part.content} 
              alt={part.alt} 
              className="rounded-lg shadow-lg mx-auto max-w-full border-2 border-[var(--color-border)]" 
              crossOrigin="anonymous" // Required for html2canvas
              referrerPolicy="no-referrer"
            />
            <p className="text-center text-xs text-[var(--color-text-subtle)] mt-2 italic max-w-prose">{part.alt}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[var(--color-surface)]/80 rounded-lg p-6 flex-grow flex flex-col shadow-lg border border-[var(--color-border)]/70 min-h-[300px] lg:min-h-0 relative">
       {solution.length > 0 && !isLoading && !error && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
          {/* Voice Gender Selection Controls */}
          <div className="flex items-center gap-1.5 bg-[var(--color-surface-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
            <span className="text-xs font-bold text-[var(--color-text-subtle)] px-2 flex items-center gap-1">
              🎙️ Voice:
            </span>
            <button
              type="button"
              onClick={() => updateVoiceSettings({ gender: 'female', voiceURI: '' })}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                voiceSettings.gender === 'female'
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
              title="Select Female Voice"
            >
              👩 Female
            </button>
            <button
              type="button"
              onClick={() => updateVoiceSettings({ gender: 'male', voiceURI: '' })}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                voiceSettings.gender === 'male'
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
              title="Select Male Voice"
            >
              👨 Male
            </button>
            <button
              type="button"
              onClick={() => updateVoiceSettings({ gender: 'auto', voiceURI: '' })}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                voiceSettings.gender === 'auto'
                  ? 'bg-[var(--color-accent)] text-white shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
              }`}
              title="Auto Voice"
            >
              ⚡ Auto
            </button>
            
            <button
              type="button"
              onClick={() => setShowVoicePanel(!showVoicePanel)}
              className="px-2 py-1 text-xs font-semibold text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] border-l border-[var(--color-border)] ml-1 pl-2 transition-colors"
              title="More voice options"
            >
              ⚙️ Speed/Voice
            </button>
          </div>

          {/* Action Buttons: Read Aloud, Stop, Download */}
          <div className="flex items-center gap-2">
             {speechState !== 'idle' && (
               <button
                onClick={stopSpeech}
                className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded-full transition-colors shadow-sm flex items-center gap-1 text-xs px-3"
                aria-label="Stop reading"
               >
                 <StopIcon className="w-4 h-4" />
                 <span>Stop</span>
               </button>
             )}
             <button 
               onClick={handleSpeak}
               className={`font-bold p-2 rounded-lg transition-all shadow-sm flex items-center gap-1.5 text-xs px-3.5 ${
                 speechState === 'speaking'
                   ? 'bg-amber-500 text-white animate-pulse'
                   : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white'
               }`}
               aria-label={speechState === 'speaking' ? 'Pause reading' : speechState === 'paused' ? 'Resume reading' : 'Read solution aloud'}
             >
               {speechState === 'speaking' ? (
                 <>
                   <PauseIcon className="w-4 h-4" />
                   <span>Pause Reading</span>
                 </>
               ) : (
                 <>
                   <SpeakerIcon className="w-4 h-4" />
                   <span>Read Solution Aloud</span>
                 </>
               )}
             </button>
             <button 
              onClick={handleDownload}
              className="bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text-main)] font-bold p-2 rounded-lg transition-colors shadow-sm flex items-center gap-1 text-xs px-3"
              aria-label="Download solution as PDF"
              title="Download PDF"
            >
              <DownloadIcon className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button 
              onClick={handleCopyLink}
              className={`font-bold p-2 rounded-lg transition-colors shadow-sm flex items-center gap-1 text-xs px-3 ${
                copiedLink
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text-main)]'
              }`}
              aria-label="Share direct problem link"
              title="Copy shareable link for this solution"
            >
              <span>{copiedLink ? '✓ Copied!' : '🔗 Share Link'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Expanded Voice Customization Panel */}
      {showVoicePanel && solution.length > 0 && (
        <div className="mb-4 p-3 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-lg text-xs space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--color-text-main)]">Speech Speed Rate:</span>
              {[0.8, 1.0, 1.2, 1.4].map(rate => (
                <button
                  key={rate}
                  onClick={() => updateVoiceSettings({ speechRate: rate })}
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    voiceSettings.speechRate === rate
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {voices.length > 0 && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="font-bold text-[var(--color-text-main)] whitespace-nowrap">Specific Voice:</span>
                <select
                  value={voiceSettings.voiceURI}
                  onChange={(e) => updateVoiceSettings({ voiceURI: e.target.value })}
                  className="p-1 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-main)] text-xs max-w-xs"
                >
                  <option value="">Default ({voiceSettings.gender.toUpperCase()} Voice Filter)</option>
                  {voices.map(v => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-center items-center">
        {isLoading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
        {error && !isLoading && <div className="text-red-700 bg-red-100/50 p-4 rounded-md w-full border border-red-200">{error}</div>}
        {!isLoading && !error && solution.length === 0 && (!isLoggedIn ? <LoginPrompt /> : <WelcomeMessage />)}
        {!isLoading && !error && solution.length > 0 && (
           <div ref={outputRef} className="prose max-w-none text-[var(--color-text-main)] prose-p:text-[var(--color-text-main)] prose-headings:text-[var(--color-text-secondary)] prose-strong:text-[var(--color-text-secondary)] prose-a:text-[var(--color-text-accent)] hover:prose-a:text-[var(--color-accent-hover)] prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:text-[var(--color-text-muted)] prose-code:text-red-800 prose-code:bg-red-100/50 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono w-full p-2">
             {solution.map(renderContentPart)}
           </div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;