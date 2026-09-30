import React, { useState } from 'react';
import * as authService from '../services/authService';
import { COUNTRIES, getCountryByCode, setActiveCountryCode, getActiveCountryCode } from '../services/countryCurriculumService';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: () => void;
  initialMode?: 'login' | 'signup';
}

type AuthFlowMode = 'login' | 'signup' | 'forgotPassword' | 'enterCode' | 'newPassword';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<AuthFlowMode>(initialMode);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => getActiveCountryCode());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedCountry = getCountryByCode(selectedCountryCode);
  
  const commonInputClasses = "w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition mb-4 text-sm";
  const commonButtonClasses = "w-full mt-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-accent-disabled)] text-white font-bold py-3 px-4 rounded-md transition-all duration-200 shadow-md";

  const clearFormState = () => {
    setPassword('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
  };
  
  const switchMode = (newMode: AuthFlowMode) => {
    clearFormState();
    setMode(newMode);
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setActiveCountryCode(countryCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      switch (mode) {
        case 'login': {
          const result = await authService.login(email, password);
          if (result.success) {
            if (result.user?.country) {
              setActiveCountryCode(result.user.country);
            }
            onAuthSuccess();
          } else {
            setError(result.message);
          }
          break;
        }
        case 'signup': {
          if (!fullName.trim()) {
            setError('Please enter your Full Name.');
            break;
          }
          if (!email || !password) {
            setError('Please provide an email and password.');
            break;
          }
          const formattedPhone = phoneNumber.trim() ? `${selectedCountry.dialCode} ${phoneNumber.trim()}` : '';
          const result = await authService.signUp(
            email, 
            password, 
            fullName.trim(),
            selectedCountry.code, 
            formattedPhone, 
            selectedCountry.curriculumName
          );
          if (result.success) {
            setActiveCountryCode(selectedCountry.code);
            onAuthSuccess();
          } else {
            setError(result.message);
          }
          break;
        }
        case 'forgotPassword': {
          const result = await authService.requestPasswordReset(email);
          if (result.success) {
            let successMessage = result.message;
            if (result.code) {
                successMessage += `\n\nFor verification, your code is: ${result.code}`;
            }
            setMessage(successMessage);
            setMode('enterCode');
          } else {
             setError(result.message);
          }
          break;
        }
        case 'enterCode': {
            const result = await authService.verifyResetCode(email, code);
            if (result.success) {
                setMessage('');
                setMode('newPassword');
            } else {
                setError(result.message);
            }
            break;
        }
        case 'newPassword': {
            if (newPassword !== confirmPassword) {
                setError('Passwords do not match.');
                break;
            }
            if (newPassword.length < 6) {
                setError('Password must be at least 6 characters long.');
                break;
            }
            const result = await authService.resetPassword(email, newPassword);
            if (result.success) {
                setMessage('Password reset successfully! Please log in.');
                switchMode('login');
            } else {
                setError(result.message);
            }
            break;
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormContent = () => {
    switch (mode) {
      case 'forgotPassword':
        return (
          <>
            <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Reset Password</h2>
            <p className="text-[var(--color-text-muted)] mb-6 text-sm">Enter your email to receive a verification code.</p>
            <input
              type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
              className={commonInputClasses} required
            />
            <button type="submit" disabled={isLoading} className={commonButtonClasses}>
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        );
      case 'enterCode':
        return (
          <>
            <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Enter Verification Code</h2>
            <p className="text-[var(--color-text-muted)] mb-6 text-sm">A 6-digit code was sent to <strong className="text-[var(--color-text-main)]">{email}</strong>.</p>
            <input
              type="text" placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value)}
              className={commonInputClasses} required maxLength={6}
            />
            <button type="submit" disabled={isLoading} className={commonButtonClasses}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        );
      case 'newPassword':
        return (
          <>
            <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Set New Password</h2>
            <p className="text-[var(--color-text-muted)] mb-6 text-sm">Create a new, strong password.</p>
            <input
              type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              className={commonInputClasses} required
            />
            <input
              type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className={commonInputClasses} required
            />
            <button type="submit" disabled={isLoading} className={commonButtonClasses}>
              {isLoading ? 'Saving...' : 'Reset Password'}
            </button>
          </>
        );
      case 'signup':
        return (
          <>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-[var(--color-text-main)]">Create Student / Learner Account</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Select your country to calibrate teaching and syllabus to your national & international curriculum.
              </p>
            </div>

            {/* Country Selector */}
            <div className="mb-3">
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                🌍 Country & Educational Framework:
              </label>
              <select
                value={selectedCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-md p-2.5 text-xs text-[var(--color-text-main)] font-semibold focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} — ({c.curriculumName})
                  </option>
                ))}
              </select>
              <div className="mt-1.5 p-2 bg-[var(--color-surface-subtle)] rounded border border-[var(--color-border)]/60 flex items-center justify-between text-[11px]">
                <span className="text-[var(--color-text-muted)]">Active Syllabus:</span>
                <span className="font-bold text-[var(--color-accent)]">{selectedCountry.curriculumName}</span>
              </div>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                👤 Full Name: *
              </label>
              <input
                type="text" 
                placeholder="e.g. Emmanuel Chukwuemeka" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                className={commonInputClasses} 
                required 
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                📧 Email Address: *
              </label>
              <input
                type="email" placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className={commonInputClasses} required
              />
            </div>

            {/* Phone Number Field with Dial Code */}
            <div className="mb-3">
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                📱 Phone Number (with Country Code):
              </label>
              <div className="flex items-center gap-2">
                <span className="bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-main)] px-3 py-2.5 rounded-md">
                  {selectedCountry.flag} {selectedCountry.dialCode}
                </span>
                <input
                  type="tel"
                  placeholder="8012345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2.5 text-xs text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">
                Used to verify student region and localize academic support.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                🔒 Password:
              </label>
              <input
                type="password" placeholder="Create a secure password" value={password} onChange={(e) => setPassword(e.target.value)}
                className={commonInputClasses} required minLength={6}
              />
            </div>

            <button type="submit" disabled={isLoading} className={commonButtonClasses}>
              {isLoading ? 'Creating Account...' : 'Sign Up & Begin Learning'}
            </button>
          </>
        );

      default: // login
        return (
          <>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-[var(--color-text-main)]">Welcome Back</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Log in to continue your personalized academic journey.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-[var(--color-text-secondary)]">
                  📧 Email:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(authService.PRIMARY_ADMIN_EMAIL);
                    setPassword('adminPassword2026!');
                  }}
                  className="text-[11px] text-[var(--color-accent)] hover:underline font-bold"
                  title="Autofill Administrator Credentials"
                >
                  👑 Admin Quick-Fill
                </button>
              </div>
              <input
                type="email" placeholder="Your account email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={commonInputClasses} required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-1">
                🔒 Password:
              </label>
              <input
                type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)}
                className={commonInputClasses} required
              />
            </div>

            <button type="submit" disabled={isLoading} className={commonButtonClasses}>
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </>
        );
    }
  };
  
  const renderFooter = () => {
    switch(mode) {
        case 'login':
            return (
                <p className="text-sm text-center">
                <button onClick={() => switchMode('forgotPassword')} className="font-medium text-[var(--color-text-accent)] hover:underline text-xs">Forgot password?</button>
                <span className="text-[var(--color-text-subtle)] mx-1">·</span>
                <span className="text-[var(--color-text-muted)] text-xs">New student? </span>
                <button onClick={() => switchMode('signup')} className="font-bold text-[var(--color-text-accent)] hover:underline text-xs">Sign up</button>
                </p>
            );
        case 'signup':
            return (
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                    Already registered?{' '}
                    <button onClick={() => switchMode('login')} className="font-bold text-[var(--color-text-accent)] hover:underline">Log in here</button>
                </p>
            );
        case 'forgotPassword':
        case 'enterCode':
        case 'newPassword':
            return (
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                    Remember your password?{' '}
                    <button onClick={() => switchMode('login')} className="font-medium text-[var(--color-text-accent)] hover:underline">Back to Login</button>
                </p>
            );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 flex justify-center items-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[var(--color-surface)] rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-[var(--color-border)] my-auto max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {renderFormContent()}
          {error && <p className="text-red-600 text-xs mt-3 text-center bg-red-50 dark:bg-red-950/40 p-2.5 rounded-md border border-red-200">{error}</p>}
          {message && <p className="text-emerald-700 text-xs mt-3 text-center bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-md border border-emerald-200 whitespace-pre-wrap">{message}</p>}
        </form>
        <div className="mt-5 border-t border-[var(--color-border)] pt-4">
            {renderFooter()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

