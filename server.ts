import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const PRIMARY_ADMIN_EMAIL = 'uyiglory2005@gmail.com';

// Ensure data folder exists
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, 'announcements.json');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const RESET_CODES_FILE = path.join(DATA_DIR, 'reset_codes.json');

// Storage helper functions
function readJson<T>(filePath: string, defaultVal: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
}

function writeJson<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// User Record interface
interface StoredUser {
  email: string;
  fullName?: string;
  password?: string;
  isAdmin: boolean;
  country: string;
  phoneNumber: string;
  curriculum: string;
  createdAt: number;
  lastLoginAt: number;
  loginCount: number;
  lastActiveAt: number;
}

// Session Record interface
interface StoredSession {
  sessionId: string;
  email: string;
  fullName?: string;
  country?: string;
  phoneNumber?: string;
  curriculum?: string;
  loginTime: number;
  lastActiveTime: number;
  userAgent?: string;
  ip?: string;
  isOnline: boolean;
}

// Initialize seed admin user if not present
function initializeData() {
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  const cleanAdmin = PRIMARY_ADMIN_EMAIL.toLowerCase();
  if (!users[cleanAdmin]) {
    users[cleanAdmin] = {
      email: cleanAdmin,
      fullName: "God's Glory (Super Administrator)",
      password: 'adminPassword2026!',
      isAdmin: true,
      country: 'NG',
      phoneNumber: '+234 800 000 0000',
      curriculum: 'National & Global Academic Standard',
      createdAt: Date.now() - 86400000 * 30, // 30 days ago
      lastLoginAt: Date.now(),
      loginCount: 5,
      lastActiveAt: Date.now(),
    };
    writeJson(USERS_FILE, users);
    console.log(`[Admin Seed] Initialized primary admin: ${cleanAdmin}`);
  }
  readJson<StoredSession[]>(SESSIONS_FILE, []);
  readJson<any[]>(ANNOUNCEMENTS_FILE, [
    {
      id: 'ann-init-1',
      content: "Welcome to God's Glory Tutors! The platform is now fully synchronized with live online member tracking and global syllabus engines.",
      timestamp: Date.now(),
    }
  ]);
  readJson<any[]>(SCORES_FILE, []);
}
initializeData();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Utility to clean sensitive user data for client response
function sanitizeUser(user: StoredUser) {
  const isOnline = Date.now() - (user.lastActiveAt || 0) < 60000; // Active within 60s
  return {
    email: user.email,
    fullName: user.fullName || user.email.split('@')[0],
    isAdmin: user.isAdmin,
    country: user.country,
    phoneNumber: user.phoneNumber,
    curriculum: user.curriculum,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    loginCount: user.loginCount || 1,
    isOnline,
    lastActiveAt: user.lastActiveAt || user.lastLoginAt,
  };
}

// ==================== AUTH API ROUTES ====================

// 1. Sign Up
app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { email, password, fullName, country, phoneNumber, curriculum } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanFullName = (fullName || '').trim() || cleanEmail.split('@')[0];
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});

  if (users[cleanEmail]) {
    return res.status(400).json({ success: false, message: 'User with this email already exists.' });
  }

  const isAdmin = cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase();
  const now = Date.now();
  const newUser: StoredUser = {
    email: cleanEmail,
    fullName: cleanFullName,
    password,
    isAdmin,
    country: country || 'NG',
    phoneNumber: phoneNumber || '',
    curriculum: curriculum || 'National Standard',
    createdAt: now,
    lastLoginAt: now,
    loginCount: 1,
    lastActiveAt: now,
  };

  users[cleanEmail] = newUser;
  writeJson(USERS_FILE, users);

  // Record active session
  const sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
  const newSession: StoredSession = {
    sessionId: `${now}-${Math.random().toString(36).substring(2, 9)}`,
    email: cleanEmail,
    fullName: cleanFullName,
    country: newUser.country,
    phoneNumber: newUser.phoneNumber,
    curriculum: newUser.curriculum,
    loginTime: now,
    lastActiveTime: now,
    userAgent: req.headers['user-agent'] || 'Browser Client',
    ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Local',
    isOnline: true,
  };
  sessions.unshift(newSession);
  writeJson(SESSIONS_FILE, sessions.slice(0, 100)); // Keep latest 100 sessions

  console.log(`[User Registered] New user registered: ${cleanFullName} (${cleanEmail})`);
  return res.json({ success: true, message: 'Sign up successful!', user: sanitizeUser(newUser) });
});

// 2. Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});

  let user = users[cleanEmail];
  const isAdmin = cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase();

  // If primary admin logs in and record does not exist or password mismatch on first run, configure safely
  if (isAdmin && !user) {
    user = {
      email: cleanEmail,
      password,
      isAdmin: true,
      country: 'NG',
      phoneNumber: '+234 800 000 0000',
      curriculum: 'National & Global Academic Standard',
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      loginCount: 1,
      lastActiveAt: Date.now(),
    };
    users[cleanEmail] = user;
    writeJson(USERS_FILE, users);
  } else if (!user || user.password !== password) {
    // If admin is using their own email and entered password, allow admin password reset if needed
    if (isAdmin && user && user.password !== password && password.length >= 6) {
      user.password = password; // update to new admin password
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  }

  const now = Date.now();
  user.lastLoginAt = now;
  user.lastActiveAt = now;
  user.loginCount = (user.loginCount || 0) + 1;
  users[cleanEmail] = user;
  writeJson(USERS_FILE, users);

  // Record active session
  const sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
  // Deactivate older session for this email
  sessions.forEach(s => {
    if (s.email === cleanEmail) s.isOnline = false;
  });
  const newSession: StoredSession = {
    sessionId: `${now}-${Math.random().toString(36).substring(2, 9)}`,
    email: cleanEmail,
    fullName: user.fullName || user.email.split('@')[0],
    country: user.country,
    phoneNumber: user.phoneNumber,
    curriculum: user.curriculum,
    loginTime: now,
    lastActiveTime: now,
    userAgent: req.headers['user-agent'] || 'Browser Client',
    ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Local',
    isOnline: true,
  };
  sessions.unshift(newSession);
  writeJson(SESSIONS_FILE, sessions.slice(0, 100));

  console.log(`[User Logged In] ${user.fullName || cleanEmail} (${cleanEmail}) logged in (Total logins: ${user.loginCount})`);
  return res.json({ success: true, message: 'Login successful!', user: sanitizeUser(user) });
});

// 3. Heartbeat / Activity Ping
app.post('/api/auth/heartbeat', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  const now = Date.now();

  if (users[cleanEmail]) {
    users[cleanEmail].lastActiveAt = now;
    writeJson(USERS_FILE, users);
  }

  const sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
  let found = false;
  for (const s of sessions) {
    if (s.email === cleanEmail && s.isOnline) {
      s.lastActiveTime = now;
      found = true;
      break;
    }
  }
  if (!found) {
    // If not found in active sessions, mark the most recent session for this user active
    const mostRecent = sessions.find(s => s.email === cleanEmail);
    if (mostRecent) {
      mostRecent.isOnline = true;
      mostRecent.lastActiveTime = now;
    } else if (users[cleanEmail]) {
      sessions.unshift({
        sessionId: `${now}-${Math.random().toString(36).substring(2, 9)}`,
        email: cleanEmail,
        country: users[cleanEmail].country,
        phoneNumber: users[cleanEmail].phoneNumber,
        curriculum: users[cleanEmail].curriculum,
        loginTime: now,
        lastActiveTime: now,
        userAgent: req.headers['user-agent'] || 'Browser Client',
        ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Local',
        isOnline: true,
      });
    }
  }
  writeJson(SESSIONS_FILE, sessions);

  // Count currently active users (active in last 90s)
  const activeCount = Object.values(users).filter(u => now - (u.lastActiveAt || 0) < 90000).length;

  return res.json({ success: true, activeUsersCount: Math.max(1, activeCount) });
});

// 4. Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const { email } = req.body;
  if (email) {
    const cleanEmail = email.trim().toLowerCase();
    const sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
    sessions.forEach(s => {
      if (s.email === cleanEmail) s.isOnline = false;
    });
    writeJson(SESSIONS_FILE, sessions);

    const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
    if (users[cleanEmail]) {
      users[cleanEmail].lastActiveAt = 0; // Mark offline
      writeJson(USERS_FILE, users);
    }
  }
  return res.json({ success: true, message: 'Logged out.' });
});

// 5. Password Reset Request
app.post('/api/auth/reset-password-request', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
  const cleanEmail = email.trim().toLowerCase();
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  const message = 'If an account exists, a 6-digit reset code has been generated. It expires in 10 minutes.';

  if (!users[cleanEmail]) {
    return res.json({ success: true, message });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const resetCodes = readJson<Record<string, { code: string; expires: number }>>(RESET_CODES_FILE, {});
  resetCodes[cleanEmail] = {
    code,
    expires: Date.now() + 10 * 60 * 1000,
  };
  writeJson(RESET_CODES_FILE, resetCodes);

  console.log(`[Reset Code] Code for ${cleanEmail}: ${code}`);
  return res.json({ success: true, message, code });
});

// 6. Verify Reset Code
app.post('/api/auth/reset-password-verify', (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code required.' });
  const cleanEmail = email.trim().toLowerCase();
  const resetCodes = readJson<Record<string, { code: string; expires: number }>>(RESET_CODES_FILE, {});
  const record = resetCodes[cleanEmail];

  if (!record || Date.now() > record.expires) {
    return res.status(400).json({ success: false, message: 'Reset code expired or not found. Please request a new code.' });
  }

  if (record.code !== code) {
    return res.status(400).json({ success: false, message: 'Invalid verification code.' });
  }

  return res.json({ success: true, message: 'Code verified.' });
});

// 7. Confirm New Password
app.post('/api/auth/reset-password-confirm', (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Valid password (min 6 characters) required.' });
  }
  const cleanEmail = email.trim().toLowerCase();
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  if (!users[cleanEmail]) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  users[cleanEmail].password = newPassword;
  writeJson(USERS_FILE, users);

  const resetCodes = readJson<Record<string, any>>(RESET_CODES_FILE, {});
  delete resetCodes[cleanEmail];
  writeJson(RESET_CODES_FILE, resetCodes);

  return res.json({ success: true, message: 'Password updated successfully! Please log in.' });
});

// 8. Update User Profile
app.post('/api/auth/profile', (req: Request, res: Response) => {
  const { email, country, phoneNumber, curriculum } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
  const cleanEmail = email.trim().toLowerCase();
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});

  if (!users[cleanEmail]) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  if (country !== undefined) users[cleanEmail].country = country;
  if (phoneNumber !== undefined) users[cleanEmail].phoneNumber = phoneNumber;
  if (curriculum !== undefined) users[cleanEmail].curriculum = curriculum;

  writeJson(USERS_FILE, users);
  return res.json({ success: true, user: sanitizeUser(users[cleanEmail]) });
});

// 9. Sync local users from client localStorage (Migration helper)
app.post('/api/auth/sync-local-users', (req: Request, res: Response) => {
  const { users: clientUsers } = req.body;
  if (!clientUsers || typeof clientUsers !== 'object') {
    return res.json({ success: true, imported: 0 });
  }

  const serverUsers = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  let imported = 0;

  for (const [rawEmail, data] of Object.entries(clientUsers)) {
    const cleanEmail = rawEmail.trim().toLowerCase();
    if (!cleanEmail) continue;

    if (!serverUsers[cleanEmail]) {
      const password = typeof data === 'string' ? data : (data as any).password || 'student123!';
      const country = typeof data === 'object' && (data as any).country ? (data as any).country : 'NG';
      const phoneNumber = typeof data === 'object' && (data as any).phoneNumber ? (data as any).phoneNumber : '';
      const curriculum = typeof data === 'object' && (data as any).curriculum ? (data as any).curriculum : 'National Standard';

      serverUsers[cleanEmail] = {
        email: cleanEmail,
        password,
        isAdmin: cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase(),
        country,
        phoneNumber,
        curriculum,
        createdAt: typeof data === 'object' && (data as any).createdAt ? (data as any).createdAt : Date.now(),
        lastLoginAt: Date.now(),
        loginCount: 1,
        lastActiveAt: Date.now(),
      };
      imported++;
    }
  }

  if (imported > 0) {
    writeJson(USERS_FILE, serverUsers);
    console.log(`[Sync] Imported ${imported} local users into server database.`);
  }

  return res.json({ success: true, imported });
});

// ==================== ADMIN API ROUTES ====================

// 1. Get All Registered Users with Live Online State
app.get('/api/admin/users', (req: Request, res: Response) => {
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  const userList = Object.values(users).map(sanitizeUser);

  // Sort: Admin first, then newest registered/logged in
  userList.sort((a, b) => {
    if (a.isAdmin && !b.isAdmin) return -1;
    if (!a.isAdmin && b.isAdmin) return 1;
    return (b.lastLoginAt || 0) - (a.lastLoginAt || 0);
  });

  return res.json({ success: true, users: userList });
});

// 2. Get Live Sessions and Logged In People
app.get('/api/admin/sessions', (req: Request, res: Response) => {
  const sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
  const now = Date.now();

  const formattedSessions = sessions.map(s => ({
    ...s,
    // Calculate live status: Online if active within last 90 seconds
    isOnline: s.isOnline && now - s.lastActiveTime < 90000,
  }));

  // Sort online sessions first, then most recently active
  formattedSessions.sort((a, b) => {
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;
    return b.lastActiveTime - a.lastActiveTime;
  });

  return res.json({ success: true, sessions: formattedSessions });
});

// 3. Admin Add User Manually
app.post('/api/admin/users', (req: Request, res: Response) => {
  const { email, fullName, password, country, phoneNumber, curriculum } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanFullName = (fullName || '').trim() || cleanEmail.split('@')[0];
  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});

  if (users[cleanEmail]) {
    return res.status(400).json({ success: false, message: 'User already exists.' });
  }

  const now = Date.now();
  const newUser: StoredUser = {
    email: cleanEmail,
    fullName: cleanFullName,
    password: password || 'studentPass2026',
    isAdmin: cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase(),
    country: country || 'NG',
    phoneNumber: phoneNumber || '',
    curriculum: curriculum || 'National Standard',
    createdAt: now,
    lastLoginAt: now,
    loginCount: 0,
    lastActiveAt: now,
  };

  users[cleanEmail] = newUser;
  writeJson(USERS_FILE, users);

  return res.json({ success: true, message: `User ${cleanFullName} (${cleanEmail}) added successfully!`, user: sanitizeUser(newUser) });
});

// Helper function to perform user deletion
function performUserDeletion(cleanEmail: string): { success: boolean; status: number; message: string } {
  if (cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return { success: false, status: 403, message: 'The primary admin account cannot be deleted.' };
  }

  const users = readJson<Record<string, StoredUser>>(USERS_FILE, {});
  if (!users[cleanEmail]) {
    return { success: false, status: 404, message: 'User not found in directory.' };
  }

  const deletedName = users[cleanEmail].fullName || cleanEmail;
  delete users[cleanEmail];
  writeJson(USERS_FILE, users);

  // Clear user sessions
  let sessions = readJson<StoredSession[]>(SESSIONS_FILE, []);
  sessions = sessions.filter(s => s.email !== cleanEmail);
  writeJson(SESSIONS_FILE, sessions);

  // Clear user scores
  let scores = readJson<any[]>(SCORES_FILE, []);
  scores = scores.filter(s => s.email !== cleanEmail);
  writeJson(SCORES_FILE, scores);

  console.log(`[User Deleted] Successfully removed user: ${deletedName} (${cleanEmail})`);
  return { success: true, status: 200, message: `User "${deletedName}" (${cleanEmail}) and all related records deleted successfully.` };
}

// 4. Admin Delete User (HTTP DELETE)
app.delete('/api/admin/users/:email', (req: Request, res: Response) => {
  const { email } = req.params;
  const cleanEmail = (email as string).trim().toLowerCase();
  const result = performUserDeletion(cleanEmail);
  return res.status(result.status).json({ success: result.success, message: result.message });
});

// 4b. Admin Delete User (HTTP POST fallback for iframe environments)
app.post('/api/admin/users/delete', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required to delete user.' });
  }
  const cleanEmail = (email as string).trim().toLowerCase();
  const result = performUserDeletion(cleanEmail);
  return res.status(result.status).json({ success: result.success, message: result.message });
});

// ==================== ANNOUNCEMENTS API ====================

app.get('/api/announcements', (req: Request, res: Response) => {
  const announcements = readJson<any[]>(ANNOUNCEMENTS_FILE, []);
  return res.json({ success: true, announcements });
});

app.post('/api/announcements', (req: Request, res: Response) => {
  const { content, adminEmail: bodyAdminEmail } = req.body;
  const adminEmail = ((req.headers['x-admin-email'] as string) || bodyAdminEmail || (req.query.adminEmail as string) || '').trim().toLowerCase();

  if (adminEmail !== PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return res.status(403).json({ success: false, message: 'Forbidden. Only the administrator has the rights to post announcements.' });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: 'Content cannot be empty.' });
  }

  const announcements = readJson<any[]>(ANNOUNCEMENTS_FILE, []);
  const newAnn = {
    id: `ann-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    content: content.trim(),
    timestamp: Date.now(),
  };

  announcements.unshift(newAnn);
  writeJson(ANNOUNCEMENTS_FILE, announcements);
  return res.json({ success: true, announcements });
});

app.delete('/api/announcements/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const adminEmail = ((req.headers['x-admin-email'] as string) || (req.query.adminEmail as string) || (req.body?.adminEmail as string) || '').trim().toLowerCase();

  if (adminEmail !== PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return res.status(403).json({ success: false, message: 'Forbidden. Only the administrator has the rights to delete announcements.' });
  }

  let announcements = readJson<any[]>(ANNOUNCEMENTS_FILE, []);
  announcements = announcements.filter(a => a.id !== id);
  writeJson(ANNOUNCEMENTS_FILE, announcements);
  return res.json({ success: true, announcements });
});

// ==================== SCORES API ====================

app.get('/api/scores', (req: Request, res: Response) => {
  const scores = readJson<any[]>(SCORES_FILE, []);
  scores.sort((a, b) => b.score !== a.score ? b.score - a.score : b.timestamp - a.timestamp);
  return res.json({ success: true, scores });
});

app.post('/api/scores', (req: Request, res: Response) => {
  const newScore = req.body;
  const scores = readJson<any[]>(SCORES_FILE, []);
  const item = {
    ...newScore,
    id: `score-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
  };
  scores.push(item);
  scores.sort((a, b) => b.score !== a.score ? b.score - a.score : b.timestamp - a.timestamp);
  writeJson(SCORES_FILE, scores);
  return res.json({ success: true, scores });
});

app.delete('/api/scores', (req: Request, res: Response) => {
  writeJson(SCORES_FILE, []);
  return res.json({ success: true, message: 'Scoreboard reset successfully.' });
});

// ==================== VITE & STATIC SERVING ====================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(process.cwd(), 'dist'));

  if (isProd) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[God's Glory Tutors Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
