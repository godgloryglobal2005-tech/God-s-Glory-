import { User, HistoryItem, SolutionType, ContentPart } from '../types';
import { getScores, saveScores } from './scoreService';

const USERS_KEY = 'gods_glory_tutors_users';
const SESSION_KEY = 'gods_glory_tutors_session';
const HISTORY_KEY_PREFIX = 'gods_glory_tutors_history_';
const RESET_CODE_KEY_PREFIX = 'gods_glory_tutors_reset_code_';
const CODE_EXPIRY_MINUTES = 10;
const MAX_HISTORY_ITEMS = 20;

export const PRIMARY_ADMIN_EMAIL = 'uyiglory2005@gmail.com';

export interface StoredUserProfile {
  password: string;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
  createdAt?: number;
}

export const isUserAdmin = (email: string): boolean => {
  if (!email) return false;
  return email.trim().toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();
};

// Helper to get all users from localStorage (supporting legacy string and object schemas)
const getUsers = (): Record<string, StoredUserProfile> => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const normalized: Record<string, StoredUserProfile> = {};
    for (const [email, value] of Object.entries(parsed)) {
      if (typeof value === 'string') {
        normalized[email] = { password: value, country: 'NG', phoneNumber: '', curriculum: 'NERDC / WAEC Standard' };
      } else if (value && typeof value === 'object') {
        normalized[email] = value as StoredUserProfile;
      }
    }
    return normalized;
  } catch (error) {
    return {};
  }
};

// Helper to save users to localStorage with quota protection
const saveUsers = (users: Record<string, StoredUserProfile>): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users:", error);
  }
};

// Sign up a new user with country, phone, and curriculum
export const signUp = (
  email: string, 
  password: string, 
  country?: string, 
  phoneNumber?: string, 
  curriculum?: string
): { success: boolean, message: string, user: User | null } => {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();
  
  if (users[cleanEmail]) {
    return { success: false, message: 'User with this email already exists.', user: null };
  }

  const isAdmin = isUserAdmin(cleanEmail);

  users[cleanEmail] = {
    password,
    country: country || 'NG',
    phoneNumber: phoneNumber || '',
    curriculum: curriculum || 'National Standard',
    createdAt: Date.now()
  };
  saveUsers(users);
  
  const user: User = { 
    email: cleanEmail, 
    isAdmin,
    country: users[cleanEmail].country,
    phoneNumber: users[cleanEmail].phoneNumber,
    curriculum: users[cleanEmail].curriculum
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn("Could not persist session to localStorage", e);
  }
  return { success: true, message: 'Sign up successful!', user };
};

// Log in an existing user
export const login = (email: string, password: string): { success: boolean, message: string, user: User | null } => {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  const userRecord = users[cleanEmail];
  if (!userRecord || userRecord.password !== password) {
    return { success: false, message: 'Invalid email or password.', user: null };
  }

  const isAdmin = isUserAdmin(cleanEmail);
  
  const user: User = { 
    email: cleanEmail, 
    isAdmin,
    country: userRecord.country || 'NG',
    phoneNumber: userRecord.phoneNumber || '',
    curriculum: userRecord.curriculum || 'National Standard'
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn("Could not persist session to localStorage", e);
  }
  return { success: true, message: 'Login successful!', user };
};

// Log out the current user
export const logout = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn("Could not remove session from localStorage", e);
  }
};

// Get the currently logged-in user with strict admin verification
export const getCurrentUser = (): User | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    const parsed = JSON.parse(session) as User;
    if (!parsed || !parsed.email) return null;
    // Strictly verify and enforce admin status dynamically
    parsed.isAdmin = isUserAdmin(parsed.email);
    return parsed;
  } catch (error) {
    return null;
  }
};

// Step 1: Generate and store a reset code.
export const requestPasswordReset = (email: string): { success: boolean, message: string, code?: string } => {
  const users = getUsers();
  const message = `If an account with that email exists, a 6-digit reset code has been sent. It will expire in ${CODE_EXPIRY_MINUTES} minutes.`;
  
  if (users[email]) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000;
    
    const resetKey = `${RESET_CODE_KEY_PREFIX}${email}`;
    try {
      sessionStorage.setItem(resetKey, JSON.stringify({ code, expires }));
    } catch (e) {
      console.warn("Could not store reset code", e);
    }

    console.log(`Password reset code for ${email} is: ${code}`);
    return { success: true, message, code };
  }
  
  return { success: true, message };
};

// Step 2: Verify the provided code.
export const verifyResetCode = (email: string, code: string): { success: boolean, message: string } => {
  const resetKey = `${RESET_CODE_KEY_PREFIX}${email}`;
  let data: string | null = null;
  try {
    data = sessionStorage.getItem(resetKey);
  } catch {
    return { success: false, message: 'Storage error while verifying code.' };
  }

  if (!data) {
    return { success: false, message: 'No reset request found or it has expired. Please request a new code.' };
  }

  try {
    const { code: storedCode, expires } = JSON.parse(data);
    if (Date.now() > expires) {
      try { sessionStorage.removeItem(resetKey); } catch {}
      return { success: false, message: 'The reset code has expired. Please request a new one.' };
    }
    if (storedCode === code) {
      return { success: true, message: 'Code verified.' };
    } else {
      return { success: false, message: 'Invalid verification code.' };
    }
  } catch {
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

// Step 3: Update the password after successful verification.
export const resetPassword = (email: string, newPassword: string): { success: boolean, message: string } => {
  const resetKey = `${RESET_CODE_KEY_PREFIX}${email}`;
  let hasValidReset = false;
  try {
    hasValidReset = !!sessionStorage.getItem(resetKey);
  } catch {}

  if (!hasValidReset) {
    return { success: false, message: 'Invalid reset attempt. Please start over.' };
  }
  
  const users = getUsers();
  if (!users[email]) {
    return { success: false, message: 'User not found.' };
  }
  const existingUser = users[email];
  users[email] = {
    ...existingUser,
    password: newPassword,
  };
  saveUsers(users);

  try {
    sessionStorage.removeItem(resetKey);
  } catch {}

  return { success: true, message: 'Password updated successfully.' };
};

// Update a user's country, phone, or curriculum profile
export const updateUserProfile = (
  email: string, 
  updates: Partial<Pick<User, 'country' | 'phoneNumber' | 'curriculum'>>
): boolean => {
  try {
    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();
    if (!users[cleanEmail]) return false;

    users[cleanEmail] = {
      ...users[cleanEmail],
      ...(updates.country !== undefined ? { country: updates.country } : {}),
      ...(updates.phoneNumber !== undefined ? { phoneNumber: updates.phoneNumber } : {}),
      ...(updates.curriculum !== undefined ? { curriculum: updates.curriculum } : {})
    };
    saveUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      const updatedUser: User = {
        ...currentUser,
        ...updates
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    }
    return true;
  } catch (e) {
    console.error("Failed to update profile", e);
    return false;
  }
};

// Get all users (for admin page)
export const getAllUsers = (): User[] => {
  const users = getUsers();
  const allUserEmails = Object.keys(users);
  return allUserEmails.map(email => ({
    email,
    isAdmin: isUserAdmin(email),
    country: users[email]?.country || 'NG',
    phoneNumber: users[email]?.phoneNumber || '—',
    curriculum: users[email]?.curriculum || 'Standard'
  }));
};

// Delete a user (for admin page)
export const deleteUser = (emailToDelete: string): { success: boolean, message: string } => {
  const users = getUsers();
  const cleanDeleteEmail = emailToDelete.trim().toLowerCase();
  
  if (isUserAdmin(cleanDeleteEmail)) {
    return { success: false, message: "The primary admin and app creator cannot be deleted." };
  }

  if (!users[cleanDeleteEmail]) {
    return { success: false, message: "User not found." };
  }

  delete users[cleanDeleteEmail];
  saveUsers(users);

  clearHistory(cleanDeleteEmail);

  try {
    const allScores = getScores();
    const remainingScores = allScores.filter(score => score.email !== cleanDeleteEmail);
    saveScores(remainingScores);
  } catch (e) {
    console.error("Could not remove scores for deleted user:", e);
  }

  return { success: true, message: `User ${cleanDeleteEmail} and all their data have been deleted.` };
};


// --- History Management with Storage Quota Defense ---

const getHistoryKey = (email: string) => `${HISTORY_KEY_PREFIX}${email.trim().toLowerCase()}`;

/**
 * Sanitizes solution parts to ensure heavy base64 image strings (> 1KB) do not consume the origin quota.
 */
const sanitizeSolutionForStorage = (solution: SolutionType): SolutionType => {
  if (!Array.isArray(solution)) return [];
  return solution.map((part) => {
    if (part.type === 'image') {
      // If the image is a massive data URL (e.g. PNG/JPEG base64), replace with lightweight placeholder
      const isLargeDataUrl = typeof part.content === 'string' && part.content.length > 500;
      return {
        type: 'image',
        content: isLargeDataUrl ? '' : part.content,
        alt: part.alt || 'Educational Diagram',
      };
    }
    if (part.type === 'text') {
      // Keep up to 30,000 characters per text chunk to prevent unbounded growth
      const textContent = typeof part.content === 'string' ? part.content : '';
      return {
        type: 'text',
        content: textContent.length > 30000 ? textContent.slice(0, 30000) + '... [truncated for storage]' : textContent,
      };
    }
    return part;
  });
};

/**
 * Automatically cleans any previously saved oversized history payloads in localStorage
 */
const cleanOversizedStorage = (): void => {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(HISTORY_KEY_PREFIX)) {
        try {
          const raw = localStorage.getItem(key);
          if (raw && raw.length > 100000) { // Greater than ~100KB
            const items = JSON.parse(raw);
            if (Array.isArray(items)) {
              const cleaned = items.slice(0, 15).map(item => ({
                ...item,
                solution: sanitizeSolutionForStorage(item.solution || []),
              }));
              localStorage.setItem(key, JSON.stringify(cleaned));
            }
          }
        } catch (innerErr) {
          // If corrupted or unable to parse, reset this history key to avoid quota lock
          localStorage.removeItem(key);
        }
      }
    }
  } catch (e) {
    console.warn("Storage cleanup notice:", e);
  }
};

// Run background cleanup once on module load
try {
  cleanOversizedStorage();
} catch {}

/**
 * Safely writes history to localStorage with graceful fallback on QuotaExceededError
 */
const safeSaveHistory = (email: string, history: HistoryItem[]): void => {
  const key = getHistoryKey(email);
  
  // Step 1: Sanitize all items and limit to MAX_HISTORY_ITEMS
  let itemsToSave = history.slice(0, MAX_HISTORY_ITEMS).map(item => ({
    ...item,
    solution: sanitizeSolutionForStorage(item.solution),
  }));

  try {
    localStorage.setItem(key, JSON.stringify(itemsToSave));
    return;
  } catch (error: any) {
    console.warn("Quota exceeded while saving history, executing progressive eviction...", error);
  }

  // Step 2: Progressive eviction - reduce to top 10 items
  try {
    itemsToSave = itemsToSave.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(itemsToSave));
    return;
  } catch {}

  // Step 3: Progressive eviction - reduce to top 3 items, purely text
  try {
    itemsToSave = itemsToSave.slice(0, 3).map(item => ({
      ...item,
      solution: (item.solution || []).filter(p => p.type === 'text'),
    }));
    localStorage.setItem(key, JSON.stringify(itemsToSave));
    return;
  } catch {}

  // Step 4: Final fallback - only store the single newest item
  try {
    itemsToSave = itemsToSave.slice(0, 1);
    localStorage.setItem(key, JSON.stringify(itemsToSave));
  } catch (finalError) {
    console.error("Critical storage quota lock. Could not save history item:", finalError);
  }
};

export const getHistory = (email: string): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(getHistoryKey(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addHistoryItem = (email: string, item: Omit<HistoryItem, 'id' | 'timestamp'>): void => {
  try {
    const history = getHistory(email);
    const newHistoryItem: HistoryItem = {
      ...item,
      solution: sanitizeSolutionForStorage(item.solution),
      id: new Date().toISOString() + '-' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    history.unshift(newHistoryItem);
    safeSaveHistory(email, history);
  } catch (error) {
    console.warn("Error in addHistoryItem:", error);
  }
};

export const clearHistory = (email: string): void => {
  try {
    localStorage.removeItem(getHistoryKey(email));
  } catch (error) {
    console.warn("Error in clearHistory:", error);
  }
};
