import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidApkModalProps {
  onClose: () => void;
}

export const AndroidApkModal: React.FC<AndroidApkModalProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'instant' | 'apk_builder' | 'step_by_step'>('instant');
  const [isCopied, setIsCopied] = useState(false);

  const appUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDirectInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-[var(--color-surface)] border-2 border-[var(--color-accent)]/50 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl my-auto text-[var(--color-text-main)] space-y-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center text-2xl shadow-xs">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  Android APK & PWA Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1">
                Install or Build Android App (.APK)
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-xl bg-[var(--color-surface-subtle)] p-1 border border-[var(--color-border)] text-xs font-bold">
          <button
            onClick={() => setActiveTab('instant')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'instant'
                ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            ⚡ 1-Click Instant Android Install
          </button>
          <button
            onClick={() => setActiveTab('apk_builder')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'apk_builder'
                ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            📦 APK Package Files (Capacitor)
          </button>
          <button
            onClick={() => setActiveTab('step_by_step')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'step_by_step'
                ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            📋 Step-by-Step Guide
          </button>
        </div>

        {/* TAB 1: INSTANT INSTALL (Direct WebAPK / PWA) */}
        {activeTab === 'instant' && (
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-emerald-900 dark:text-emerald-300">
                  Direct Installation on Android Phone / Tablet
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Installs as a standalone native Android application (WebAPK) on your home screen and app launcher with full-screen experience and zero browser address bar.
                </p>
              </div>

              {isInstalled ? (
                <span className="shrink-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-lg border border-emerald-300 flex items-center gap-1">
                  ✓ Already Installed!
                </span>
              ) : isInstallable ? (
                <button
                  onClick={handleDirectInstall}
                  className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>📲</span>
                  <span>Install on Android Now</span>
                </button>
              ) : (
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>{isCopied ? '✓ Link Copied!' : '📋 Copy App Link'}</span>
                </button>
              )}
            </div>

            {/* How to install in Chrome on Android */}
            <div className="bg-[var(--color-surface-subtle)] p-4 rounded-xl border border-[var(--color-border)] text-xs space-y-2">
              <p className="font-bold text-[var(--color-text-main)]">How to install directly from your phone's browser:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[var(--color-text-muted)]">
                <li>Open this app on your Android phone using <strong>Chrome</strong>, <strong>Samsung Internet</strong>, or <strong>Edge</strong>.</li>
                <li>Tap the <strong>three dots (⋮)</strong> menu in the top right of the browser.</li>
                <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>Tap <strong>Install</strong>. Android will generate the native package and place the God's Glory Tutors app icon right on your phone!</li>
              </ol>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-xs">
              <span className="text-[var(--color-text-muted)] font-mono truncate max-w-sm">{appUrl}</span>
              <button 
                onClick={handleCopyLink}
                className="text-[var(--color-accent)] font-bold hover:underline shrink-0 ml-2"
              >
                {isCopied ? 'Copied!' : 'Copy Link to Phone'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: APK BUILDER (Capacitor / Bubblewrap Config) */}
        {activeTab === 'apk_builder' && (
          <div className="space-y-4 text-xs">
            <p className="text-[var(--color-text-muted)]">
              This project is pre-configured with a ready-to-run <strong>Capacitor Android wrapper</strong> and <strong>Web App Manifest</strong> so you can compile a physical <code>.apk</code> file for sideloading or sharing on WhatsApp / Telegram / Google Drive!
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] space-y-2 border border-slate-800 overflow-x-auto">
              <p className="text-emerald-400 font-bold"># Option A: Quick APK build with Bubblewrap (No code changes needed)</p>
              <p className="text-slate-300">npx @bubblewrap/cli init --manifest={appUrl}/manifest.json</p>
              <p className="text-slate-300">npx @bubblewrap/cli build</p>
              <p className="text-amber-400 pt-2 font-bold"># Option B: Build APK with Capacitor & Android Studio</p>
              <p className="text-slate-300">npm run build</p>
              <p className="text-slate-300">npx cap add android</p>
              <p className="text-slate-300">npx cap sync</p>
              <p className="text-slate-300">npx cap open android   # Opens in Android Studio to build .apk</p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[var(--color-text-muted)]">
              <strong className="text-amber-900 dark:text-amber-400">💡 Important Note for Admin:</strong>
              <p className="mt-0.5">
                The APK connects directly to the live backend URL, meaning all students who download your APK will be tracked live in your <strong>Admin Management Portal</strong>!
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: STEP BY STEP GUIDE */}
        {activeTab === 'step_by_step' && (
          <div className="space-y-4 text-xs text-[var(--color-text-muted)]">
            <h3 className="font-extrabold text-sm text-[var(--color-text-main)]">
              Three Ways to Distribute Your Android App:
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)]">
                <span className="font-black text-[var(--color-text-main)] block mb-1">
                  1. Zero-Download Direct Install (Recommended for Students)
                </span>
                <p>
                  Share your app link with students. When they tap the link on Android, their browser automatically prompts them to install it. It behaves identical to an APK installed from the Play Store!
                </p>
              </div>

              <div className="p-3.5 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)]">
                <span className="font-black text-[var(--color-text-main)] block mb-1">
                  2. Sideloadable standalone APK (`app-release.apk`)
                </span>
                <p>
                  Use Bubblewrap or PWABuilder (pwabuilder.com) to paste your web app URL and generate a signed Android APK in 30 seconds that you can send directly to anyone as a file.
                </p>
              </div>

              <div className="p-3.5 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)]">
                <span className="font-black text-[var(--color-text-main)] block mb-1">
                  3. Google Play Store Release
                </span>
                <p>
                  Using the Web App Manifest and generated Android package, upload the AAB / APK directly to Google Play Console.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center text-xs">
          <span className="text-[var(--color-text-subtle)] font-medium">
            App ID: <code className="text-[var(--color-accent)] font-mono">com.godsglorytutors.app</code>
          </span>
          <button
            onClick={onClose}
            className="bg-[var(--color-surface-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-main)] font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AndroidApkModal;
