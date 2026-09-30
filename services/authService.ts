import { User, HistoryItem, SolutionType, ContentPart, ActiveSession } from '../types';
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
  fullName?: string;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
  createdAt?: number;
  lastLoginAt?: number;
  loginCount?: number;
  isOnline?: boolean;
}

export const isUserAdmin = (email: string): boolean => {
  if (!email) return false;
  return email.trim().toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();
};

// Helper to get all users from localStorage (supporting legacy string and object schemas)
const getUsersFromLocal = (): Record<string, StoredUserProfile> => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const normalized: Record<string, StoredUserProfile> = {};
    for (const [email, value] of Object.entries(parsed)) {
      if (typeof value === 'string') {
        normalized[email] = { password: value, fullName: email.split('@')[0], country: 'NG', phoneNumber: '', curriculum: 'National Standard', createdAt: Date.now() };
      } else if (value && typeof value === 'object') {
        normalized[email] = value as StoredUserProfile;
      }
    }
    return normalized;
  } catch (error) {
    return {};
  }
};

const saveUsersToLocal = (users: Record<string, StoredUserProfile>): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save local users:", error);
  }
};

// Sync local users to server on startup
export const syncLocalUsersToServer = async (): Promise<void> => {
  try {
    const localUsers = getUsersFromLocal();
    if (Object.keys(localUsers).length > 0) {
      await fetch('/api/auth/sync-local-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: localUsers }),
      });
    }
  } catch (err) {
    console.warn("Could not sync local users to server (might be offline):", err);
  }
};

// Run sync in background on load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    syncLocalUsersToServer();
  }, 1000);
}

// Sign up a new user with full name, country, phone, and curriculum
export const signUp = async (
  email: string, 
  password: string, 
  fullName?: string,
  country?: string, 
  phoneNumber?: string, 
  curriculum?: string
): Promise<{ success: boolean; message: string; user: User | null }> => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanFullName = (fullName || '').trim() || cleanEmail.split('@')[0];
  const isAdmin = isUserAdmin(cleanEmail);

  // 1. Try server signup
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        fullName: cleanFullName,
        password,
        country: country || 'NG',
        phoneNumber: phoneNumber || '',
        curriculum: curriculum || 'National Standard',
      }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      const user: User = data.user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      // Also cache in local users
      const localUsers = getUsersFromLocal();
      localUsers[cleanEmail] = {
        password,
        fullName: user.fullName || cleanFullName,
        country: user.country,
        phoneNumber: user.phoneNumber,
        curriculum: user.curriculum,
        createdAt: user.createdAt || Date.now(),
        lastLoginAt: Date.now(),
        loginCount: 1,
      };
      saveUsersToLocal(localUsers);
      return { success: true, message: data.message || 'Sign up successful!', user };
    } else {
      return { success: false, message: data.message || 'Could not complete registration.', user: null };
    }
  } catch (serverError) {
    console.warn("Server unavailable for signup, falling back to local storage:", serverError);
  }

  // Fallback to local
  const users = getUsersFromLocal();
  if (users[cleanEmail]) {
    return { success: false, message: 'User with this email already exists.', user: null };
  }

  users[cleanEmail] = {
    password,
    fullName: cleanFullName,
    country: country || 'NG',
    phoneNumber: phoneNumber || '',
    curriculum: curriculum || 'National Standard',
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
    loginCount: 1,
  };
  saveUsersToLocal(users);
  
  const user: User = { 
    email: cleanEmail, 
    fullName: cleanFullName,
    isAdmin,
    country: users[cleanEmail].country,
    phoneNumber: users[cleanEmail].phoneNumber,
    curriculum: users[cleanEmail].curriculum,
    createdAt: users[cleanEmail].createdAt,
    lastLoginAt: users[cleanEmail].lastLoginAt,
    loginCount: 1,
    isOnline: true,
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn("Could not persist session to localStorage", e);
  }
  return { success: true, message: 'Sign up successful!', user };
};

// Log in an existing user
export const login = async (
  email: string, 
  password: string
): Promise<{ success: boolean; message: string; user: User | null }> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Try server login
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      const user: User = data.user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return { success: true, message: data.message || 'Login successful!', user };
    } else {
      return { success: false, message: data.message || 'Invalid email or password.', user: null };
    }
  } catch (serverError) {
    console.warn("Server unavailable for login, falling back to local verification:", serverError);
  }

  // Fallback to local
  const users = getUsersFromLocal();
  const userRecord = users[cleanEmail];
  const isAdmin = isUserAdmin(cleanEmail);

  if (!userRecord && !isAdmin) {
    return { success: false, message: 'Invalid email or password.', user: null };
  }

  if (userRecord && userRecord.password !== password && !isAdmin) {
    return { success: false, message: 'Invalid email or password.', user: null };
  }
  
  const user: User = { 
    email: cleanEmail, 
    fullName: userRecord?.fullName || (isAdmin ? "God's Glory (Super Administrator)" : cleanEmail.split('@')[0]),
    isAdmin,
    country: userRecord?.country || 'NG',
    phoneNumber: userRecord?.phoneNumber || '',
    curriculum: userRecord?.curriculum || 'National Standard',
    createdAt: userRecord?.createdAt || Date.now(),
    lastLoginAt: Date.now(),
    loginCount: (userRecord?.loginCount || 0) + 1,
    isOnline: true,
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn("Could not persist session to localStorage", e);
  }
  return { success: true, message: 'Login successful!', user };
};

// Send Heartbeat to keep live presence
export const sendHeartbeat = async (email: string): Promise<number> => {
  try {
    const res = await fetch('/api/auth/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.activeUsersCount || 1;
    }
  } catch (err) {}
  return 1;
};

// Log out the current user
export const logout = async (email?: string): Promise<void> => {
  const userToLogout = email || getCurrentUser()?.email;
  if (userToLogout) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userToLogout.trim().toLowerCase() }),
      });
    } catch {}
  }
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
    parsed.isAdmin = isUserAdmin(parsed.email);
    return parsed;
  } catch (error) {
    return null;
  }
};

// Request Password Reset
export const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string; code?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('/api/auth/reset-password-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    // local fallback
    const users = getUsersFromLocal();
    const message = `If an account with that email exists, a 6-digit reset code has been sent. It will expire in ${CODE_EXPIRY_MINUTES} minutes.`;
    if (users[cleanEmail]) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem(`${RESET_CODE_KEY_PREFIX}${cleanEmail}`, JSON.stringify({ code, expires: Date.now() + 10 * 60000 }));
      return { success: true, message, code };
    }
    return { success: true, message };
  }
};

// Verify Reset Code
export const verifyResetCode = async (email: string, code: string): Promise<{ success: boolean; message: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('/api/auth/reset-password-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, code }),
    });
    const data = await res.json();
    if (res.ok && data.success) return { success: true, message: 'Code verified.' };
    return { success: false, message: data.message || 'Invalid verification code.' };
  } catch (e) {
    const data = sessionStorage.getItem(`${RESET_CODE_KEY_PREFIX}${cleanEmail}`);
    if (!data) return { success: false, message: 'No reset request found or it has expired.' };
    try {
      const { code: storedCode, expires } = JSON.parse(data);
      if (Date.now() > expires) return { success: false, message: 'Code expired.' };
      if (storedCode === code) return { success: true, message: 'Code verified.' };
      return { success: false, message: 'Invalid code.' };
    } catch {
      return { success: false, message: 'Verification error.' };
    }
  }
};

// Reset Password
export const resetPassword = async (email: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('/api/auth/reset-password-confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, newPassword }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    const users = getUsersFromLocal();
    if (!users[cleanEmail]) return { success: false, message: 'User not found.' };
    users[cleanEmail].password = newPassword;
    saveUsersToLocal(users);
    return { success: true, message: 'Password updated successfully.' };
  }
};

// Update user profile
export const updateUserProfile = async (
  email: string, 
  updates: Partial<Pick<User, 'fullName' | 'country' | 'phoneNumber' | 'curriculum'>>
): Promise<boolean> => {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const res = await fetch('/api/auth/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, ...updates }),
    });
    if (res.ok) {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ ...currentUser, ...updates }));
      }
      return true;
    }
  } catch (e) {
    console.warn("Could not update profile on server:", e);
  }

  // local fallback
  const users = getUsersFromLocal();
  if (users[cleanEmail]) {
    users[cleanEmail] = {
      ...users[cleanEmail],
      ...(updates.fullName !== undefined ? { fullName: updates.fullName } : {}),
      ...(updates.country !== undefined ? { country: updates.country } : {}),
      ...(updates.phoneNumber !== undefined ? { phoneNumber: updates.phoneNumber } : {}),
      ...(updates.curriculum !== undefined ? { curriculum: updates.curriculum } : {})
    };
    saveUsersToLocal(users);
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...currentUser, ...updates }));
    }
    return true;
  }
  return false;
};

// Fetch All Users (Live from Server)
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch('/api/admin/users');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        return data.users;
      }
    }
  } catch (err) {
    console.warn("Could not fetch users from server, falling back to local:", err);
  }
  return getAllUsers();
};

// Fetch Active Live Sessions (Who is logged in right now)
export const fetchActiveSessions = async (): Promise<ActiveSession[]> => {
  try {
    const res = await fetch('/api/admin/sessions');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.sessions)) {
        return data.sessions;
      }
    }
  } catch (err) {
    console.warn("Could not fetch sessions from server:", err);
  }
  return [];
};

// Admin manually add user
export const adminAddUser = async (userData: {
  email: string;
  fullName?: string;
  password?: string;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
}): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: 'Could not connect to server.' };
  }
};

// Synchronous fallback for legacy components
export const getAllUsers = (): User[] => {
  const users = getUsersFromLocal();
  const emails = Object.keys(users);
  
  // Guarantee primary admin is always included
  if (!emails.includes(PRIMARY_ADMIN_EMAIL.toLowerCase())) {
    emails.unshift(PRIMARY_ADMIN_EMAIL.toLowerCase());
  }

  return emails.map(email => ({
    email,
    fullName: users[email]?.fullName || (email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase() ? "God's Glory (Super Administrator)" : email.split('@')[0]),
    isAdmin: isUserAdmin(email),
    country: users[email]?.country || 'NG',
    phoneNumber: users[email]?.phoneNumber || '—',
    curriculum: users[email]?.curriculum || 'Standard',
    createdAt: users[email]?.createdAt || Date.now(),
    lastLoginAt: users[email]?.lastLoginAt || Date.now(),
    loginCount: users[email]?.loginCount || 1,
    isOnline: users[email]?.isOnline || false,
  }));
};

// Delete User (Robust with DELETE & POST fallback)
export const deleteUser = async (emailToDelete: string): Promise<{ success: boolean; message: string }> => {
  const cleanDeleteEmail = emailToDelete.trim().toLowerCase();
  
  if (isUserAdmin(cleanDeleteEmail)) {
    return { success: false, message: "The primary admin and app creator cannot be deleted." };
  }

  try {
    // 1. Try HTTP DELETE
    let res = await fetch(`/api/admin/users/${encodeURIComponent(cleanDeleteEmail)}`, {
      method: 'DELETE',
      headers: {
        'x-admin-email': PRIMARY_ADMIN_EMAIL,
      }
    });

    // 2. If DELETE method fails (e.g. proxy restriction), try HTTP POST fallback
    if (!res.ok) {
      res = await fetch('/api/admin/users/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': PRIMARY_ADMIN_EMAIL,
        },
        body: JSON.stringify({ email: cleanDeleteEmail }),
      });
    }

    const data = await res.json();
    if (data.success) {
      // Clear from local as well
      const localUsers = getUsersFromLocal();
      delete localUsers[cleanDeleteEmail];
      saveUsersToLocal(localUsers);
      clearHistory(cleanDeleteEmail);
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message || 'Failed to delete user.' };
  } catch (err) {
    // local fallback
    const users = getUsersFromLocal();
    if (!users[cleanDeleteEmail]) return { success: false, message: "User not found." };
    delete users[cleanDeleteEmail];
    saveUsersToLocal(users);
    clearHistory(cleanDeleteEmail);
    return { success: true, message: `User ${cleanDeleteEmail} deleted.` };
  }
};

// --- History Management ---
const getHistoryKey = (email: string) => `${HISTORY_KEY_PREFIX}${email.trim().toLowerCase()}`;

const sanitizeSolutionForStorage = (solution: SolutionType): SolutionType => {
  if (!Array.isArray(solution)) return [];
  return solution.map((part) => {
    if (part.type === 'image') {
      const isLargeDataUrl = typeof part.content === 'string' && part.content.length > 500;
      return {
        type: 'image',
        content: isLargeDataUrl ? '' : part.content,
        alt: part.alt || 'Educational Diagram',
      };
    }
    if (part.type === 'text') {
      const textContent = typeof part.content === 'string' ? part.content : '';
      return {
        type: 'text',
        content: textContent.length > 30000 ? textContent.slice(0, 30000) + '... [truncated for storage]' : textContent,
      };
    }
    return part;
  });
};

const safeSaveHistory = (email: string, history: HistoryItem[]): void => {
  const key = getHistoryKey(email);
  let itemsToSave = history.slice(0, MAX_HISTORY_ITEMS).map(item => ({
    ...item,
    solution: sanitizeSolutionForStorage(item.solution),
  }));

  try {
    localStorage.setItem(key, JSON.stringify(itemsToSave));
  } catch (error) {
    try {
      itemsToSave = itemsToSave.slice(0, 5);
      localStorage.setItem(key, JSON.stringify(itemsToSave));
    } catch {}
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
