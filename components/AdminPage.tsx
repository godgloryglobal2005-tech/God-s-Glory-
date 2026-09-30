import React, { useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import * as announcementService from '../services/announcementService';
import * as scoreService from '../services/scoreService';
import { User, Announcement, Score, ActiveSession } from '../types';
import { COUNTRIES } from '../services/countryCurriculumService';

interface AdminPageProps {
  onReturnToApp?: (mode?: 'solver' | 'quiz' | 'scoreboard') => void;
}

type AdminTab = 'users' | 'sessions' | 'announcements' | 'scores';

export const AdminPage: React.FC<AdminPageProps> = ({ onReturnToApp }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'online' | 'students'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // In-App User Deletion Modal State (immune to browser iframe popup restrictions)
  const [userPendingDeletion, setUserPendingDeletion] = useState<User | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Announcement Deletion State
  const [announcementPendingDeletion, setAnnouncementPendingDeletion] = useState<string | null>(null);

  // New User Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCountry, setNewCountry] = useState('NG');
  const [newPhone, setNewPhone] = useState('');
  const [newCurriculum, setNewCurriculum] = useState('NERDC / WAEC Standard');
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Load all admin data
  const loadData = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    try {
      const [fetchedUsers, fetchedSessions, fetchedAnnouncements, fetchedScores] = await Promise.all([
        authService.fetchAllUsers(),
        authService.fetchActiveSessions(),
        announcementService.fetchAnnouncements(),
        scoreService.fetchScores(),
      ]);

      setUsers(fetchedUsers);
      setSessions(fetchedSessions);
      setAnnouncements(fetchedAnnouncements);
      setScores(fetchedScores);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setIsLoading(false);
      if (showIndicator) setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Polling for live sessions and newly registered users
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      loadData(false);
    }, 4000); // Poll every 4 seconds for real-time live monitoring
    return () => clearInterval(interval);
  }, [autoRefresh, loadData]);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setActionFeedback({ type, message });
    setTimeout(() => {
      setActionFeedback(null);
    }, 5000);
  };

  // Perform User Deletion (Called from in-app modal, works 100% inside iframes)
  const confirmDeleteUser = async () => {
    if (!userPendingDeletion) return;
    setIsDeletingUser(true);
    try {
      const email = userPendingDeletion.email;
      const result = await authService.deleteUser(email);
      if (result.success) {
        setUsers(currentUsers => currentUsers.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
        setSessions(currentSessions => currentSessions.filter(s => s.email.toLowerCase() !== email.toLowerCase()));
        showFeedback('success', result.message || `User ${email} deleted successfully.`);
        setUserPendingDeletion(null);
      } else {
        showFeedback('error', result.message || 'Could not delete user.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while attempting to delete user.');
    } finally {
      setIsDeletingUser(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      showFeedback('error', 'Email address is required.');
      return;
    }
    setIsAddingUser(true);
    try {
      const result = await authService.adminAddUser({
        email: newEmail.trim(),
        fullName: newFullName.trim() || newEmail.trim().split('@')[0],
        password: newPassword.trim() || 'studentPass2026',
        country: newCountry,
        phoneNumber: newPhone.trim(),
        curriculum: newCurriculum,
      });

      if (result.success) {
        showFeedback('success', result.message || 'New user successfully added to directory!');
        setIsAddUserModalOpen(false);
        setNewFullName('');
        setNewEmail('');
        setNewPassword('');
        setNewPhone('');
        loadData(true);
      } else {
        showFeedback('error', result.message || 'Failed to add user.');
      }
    } catch (err) {
      showFeedback('error', 'Error adding user.');
    } finally {
      setIsAddingUser(false);
    }
  };

  const handlePostAnnouncement = async (textOverride?: string) => {
    const textToPost = textOverride || newAnnouncement;
    if (!textToPost.trim()) {
      showFeedback('error', "Announcement content cannot be empty.");
      return;
    }
    const updated = await announcementService.addAnnouncement(textToPost, authService.PRIMARY_ADMIN_EMAIL);
    setAnnouncements(updated);
    setNewAnnouncement('');
    showFeedback('success', "New broadcast announcement posted successfully!");
  };

  const confirmDeleteAnnouncement = async (id: string) => {
    try {
      const updated = await announcementService.deleteAnnouncement(id, authService.PRIMARY_ADMIN_EMAIL);
      setAnnouncements(updated);
      setAnnouncementPendingDeletion(null);
      showFeedback('success', "Announcement deleted successfully.");
    } catch (e) {
      showFeedback('error', "Failed to delete announcement.");
    }
  };

  const handleClearScoreboard = async () => {
    await scoreService.clearAllScores();
    setScores([]);
    showFeedback('success', "Scoreboard reset successfully.");
  };

  // Helper formatting for timestamps
  const formatTimeAgo = (timestamp?: number): string => {
    if (!timestamp) return 'Never';
    const diff = Math.max(0, Date.now() - timestamp);
    const secs = Math.floor(diff / 1000);
    if (secs < 20) return 'Just now';
    if (secs < 60) return `${secs} seconds ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const formatDateTime = (timestamp?: number): string => {
    if (!timestamp) return '—';
    return new Date(timestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter users based on search (including Full Name) and tab filter
  const onlineCount = users.filter(u => u.isOnline).length;

  const filteredUsers = users.filter(user => {
    const term = userSearchTerm.toLowerCase();
    const matchesSearch = 
      (user.fullName && user.fullName.toLowerCase().includes(term)) ||
      user.email.toLowerCase().includes(term) ||
      (user.phoneNumber && user.phoneNumber.toLowerCase().includes(term)) ||
      (user.country && user.country.toLowerCase().includes(term)) ||
      (user.curriculum && user.curriculum.toLowerCase().includes(term));

    if (!matchesSearch) return false;
    if (filterRole === 'online') return user.isOnline;
    if (filterRole === 'students') return !user.isAdmin;
    return true;
  });

  const commonSelectClasses = "w-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition placeholder:text-[var(--color-text-subtle)] disabled:opacity-50 text-sm";
  const commonLabelClasses = "block text-xs font-bold text-[var(--color-text-secondary)] mb-1";
  const commonButtonClasses = "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-4 rounded-md transition-all duration-200 disabled:bg-[var(--color-accent-disabled)] disabled:cursor-not-allowed text-xs";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-10 space-y-3">
        <div className="w-10 h-10 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[var(--color-text-main)] font-bold text-lg">Connecting to Admin Live Operations Engine...</p>
        <p className="text-xs text-[var(--color-text-muted)]">Retrieving registered users and active student sessions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 px-3 sm:px-6 lg:px-8">
      {/* Top Admin Banner & Control Center (Laptop & Desktop Optimized) */}
      <div className="bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface-hover)] border-2 border-[var(--color-accent)]/50 rounded-2xl p-5 sm:p-7 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Live Operations Online
            </span>
            <span className="text-xs text-[var(--color-text-subtle)]">
              Logged in as Super Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-text-main)] mt-2 tracking-tight">
            God's Glory Tutors • Central Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5 max-w-3xl leading-relaxed">
            Administrator: <strong className="text-[var(--color-accent)] font-mono">{authService.PRIMARY_ADMIN_EMAIL}</strong>. You have unrestricted privileges to view all students by their <strong>Full Name</strong>, monitor who is logged in live, delete users, and broadcast announcements.
          </p>
        </div>

        {/* Action Controls & Return Button */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
          {/* Live Auto-Refresh Toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            title="Toggle live auto-refresh every 4 seconds"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
              autoRefresh 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span>{autoRefresh ? 'Live Sync: ON' : 'Live Sync: Paused'}</span>
          </button>

          {/* Manual Refresh Button */}
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-main)] text-xs font-bold px-3 py-2 rounded-lg shadow-xs hover:shadow transition-all"
          >
            <svg className={`w-3.5 h-3.5 text-[var(--color-accent)] ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
          </button>

          {onReturnToApp && (
            <button
              onClick={() => onReturnToApp('solver')}
              className="flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-extrabold py-2.5 px-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Return to App</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
          actionFeedback.type === 'success' 
            ? 'bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-900 dark:text-emerald-300' 
            : 'bg-rose-500/15 border-2 border-rose-500/40 text-rose-900 dark:text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            <span>{actionFeedback.type === 'success' ? '✅' : '⚠️'}</span>
            <span>{actionFeedback.message}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-xs font-bold underline ml-2 opacity-80 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      {/* 4 Core Statistics Cards (Laptop & Desktop Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total People Registered */}
        <div className="bg-[var(--color-surface)] p-5 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-wider">Total People Registered</p>
            <span className="text-xl">👥</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-[var(--color-text-main)] mt-2">{users.length}</p>
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mt-1 pt-2 border-t border-[var(--color-border)]/50">
            <span>{Math.max(0, users.length - 1)} Students</span>
            <span className="font-semibold text-emerald-600">Saved in live DB</span>
          </div>
        </div>

        {/* Currently Online & Logged In */}
        <div className="bg-[var(--color-surface)] p-5 rounded-2xl border-2 border-emerald-400/40 shadow-sm hover:shadow-md transition-all bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Currently Logged In</p>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2">{Math.max(1, onlineCount)}</p>
          <div className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1 pt-2 border-t border-emerald-200/50 flex justify-between">
            <span>Active within 60s</span>
            <span className="font-bold underline cursor-pointer" onClick={() => setActiveTab('sessions')}>View Sessions →</span>
          </div>
        </div>

        {/* Global Broadcast Announcements */}
        <div className="bg-[var(--color-surface)] p-5 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-wider">Active Broadcasts</p>
            <span className="text-xl">📢</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-[var(--color-accent)] mt-2">{announcements.length}</p>
          <div className="text-xs text-[var(--color-text-muted)] mt-1 pt-2 border-t border-[var(--color-border)]/50 flex justify-between">
            <span>Pushed to header</span>
            <span className="font-bold text-[var(--color-accent)] cursor-pointer" onClick={() => setActiveTab('announcements')}>Manage →</span>
          </div>
        </div>

        {/* Quiz Submissions */}
        <div className="bg-[var(--color-surface)] p-5 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase tracking-wider">Quiz Submissions</p>
            <span className="text-xl">🏆</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-indigo-600 mt-2">{scores.length}</p>
          <div className="text-xs text-[var(--color-text-muted)] mt-1 pt-2 border-t border-[var(--color-border)]/50 flex justify-between">
            <span>Leaderboard records</span>
            <span className="font-bold text-indigo-600 cursor-pointer" onClick={() => setActiveTab('scores')}>View →</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="border-b border-[var(--color-border)] flex flex-wrap gap-2 sm:gap-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
          }`}
        >
          <span>👥 Registered People Directory</span>
          <span className="text-xs bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] px-2 py-0.5 rounded-full font-mono">
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`pb-3 px-3 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'sessions'
              ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>🟢 Logged In People & Live Sessions</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
            {Math.max(1, onlineCount)} Online
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-3 px-3 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
          }`}
        >
          <span>📢 Announcements</span>
          <span className="text-xs bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] px-2 py-0.5 rounded-full font-mono">
            {announcements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('scores')}
          className={`pb-3 px-3 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'scores'
              ? 'border-indigo-500 text-indigo-700 dark:text-indigo-400'
              : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
          }`}
        >
          <span>🏆 Quiz Leaderboard</span>
          <span className="text-xs bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] px-2 py-0.5 rounded-full font-mono">
            {scores.length}
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: ALL REGISTERED USERS DIRECTORY */}
      {/* ============================================================== */}
      {activeTab === 'users' && (
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 sm:p-7 shadow-lg border border-[var(--color-border)] space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-main)]">
                Registered Students & User Directory
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                View all students with their <strong>Full Name</strong>, email, syllabus, login frequency, and account controls.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Quick Filter */}
              <div className="inline-flex rounded-lg border border-[var(--color-border)] p-1 bg-[var(--color-surface-subtle)] text-xs font-semibold">
                <button
                  onClick={() => setFilterRole('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${filterRole === 'all' ? 'bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-xs font-bold' : 'text-[var(--color-text-muted)]'}`}
                >
                  All ({users.length})
                </button>
                <button
                  onClick={() => setFilterRole('online')}
                  className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${filterRole === 'online' ? 'bg-[var(--color-surface)] text-emerald-700 shadow-xs font-bold' : 'text-[var(--color-text-muted)]'}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Online ({onlineCount})
                </button>
                <button
                  onClick={() => setFilterRole('students')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${filterRole === 'students' ? 'bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-xs font-bold' : 'text-[var(--color-text-muted)]'}`}
                >
                  Students ({Math.max(0, users.length - 1)})
                </button>
              </div>

              {/* Add New User Button */}
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="flex items-center gap-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-3.5 rounded-lg text-xs shadow-md transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Person Manually</span>
              </button>
            </div>
          </div>

          {/* Search Box (Matches Full Name as well) */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by full name, email, country, phone number, syllabus..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-xs"
            />
          </div>

          {/* Desktop & Laptop High-Density Table */}
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] shadow-xs">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] font-bold text-[var(--color-text-main)] uppercase text-[11px] tracking-wider sticky top-0">
                <tr>
                  <th scope="col" className="px-5 py-4">Student Name & Email</th>
                  <th scope="col" className="px-5 py-4">Status</th>
                  <th scope="col" className="px-5 py-4">Country & Syllabus</th>
                  <th scope="col" className="px-5 py-4">Phone Number</th>
                  <th scope="col" className="px-5 py-4">Joined Date</th>
                  <th scope="col" className="px-5 py-4">Last Login</th>
                  <th scope="col" className="px-5 py-4 text-center">Logins</th>
                  <th scope="col" className="px-5 py-4 text-right">Delete Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                {filteredUsers.map((user) => (
                  <tr key={user.email} className="transition duration-150 hover:bg-[var(--color-surface-subtle)]/70">
                    {/* Student Full Name & Email */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-black text-sm flex items-center justify-center shrink-0 uppercase border border-[var(--color-accent)]/30">
                          {(user.fullName || user.email)[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
                              {user.fullName || user.email.split('@')[0]}
                            </span>
                            {user.isAdmin && (
                              <span className="px-2 py-0.5 text-[10px] font-black uppercase text-amber-800 bg-amber-100 border border-amber-300 rounded-full inline-flex items-center gap-1">
                                👑 Super Admin
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[var(--color-text-subtle)] font-mono block">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {user.isOnline ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Online Now</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          <span>Offline</span>
                        </span>
                      )}
                    </td>

                    {/* Country & Syllabus */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[var(--color-text-main)]">
                          {user.country ? user.country.toUpperCase() : 'NG'}
                        </span>
                        <span className="text-[11px] text-[var(--color-text-subtle)]">
                          ({user.curriculum || 'Standard'})
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4 whitespace-nowrap font-mono text-xs">
                      {user.phoneNumber && user.phoneNumber !== '—' ? (
                        <span className="text-[var(--color-text-main)] font-semibold">{user.phoneNumber}</span>
                      ) : (
                        <span className="text-[var(--color-text-subtle)]">—</span>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-[var(--color-text-subtle)]">
                      {user.createdAt ? (
                        <div>
                          <span className="font-semibold text-[var(--color-text-main)]">{formatTimeAgo(user.createdAt)}</span>
                          <span className="block text-[10px] text-[var(--color-text-subtle)]">{formatDateTime(user.createdAt)}</span>
                        </div>
                      ) : (
                        <span>Initial seed</span>
                      )}
                    </td>

                    {/* Last Login */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs">
                      <span className="font-bold text-[var(--color-text-main)]">{formatTimeAgo(user.lastLoginAt)}</span>
                      <span className="block text-[10px] text-[var(--color-text-subtle)]">{formatDateTime(user.lastLoginAt)}</span>
                    </td>

                    {/* Total Logins */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <span className="inline-block bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-[var(--color-border)]">
                        {user.loginCount || 1}
                      </span>
                    </td>

                    {/* Actions: Delete Button */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      {!user.isAdmin ? (
                        <button
                          onClick={() => setUserPendingDeletion(user)}
                          className="text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-300 hover:border-red-600 px-3 py-1.5 rounded-lg transition-all shadow-2xs"
                          title={`Delete account for ${user.fullName || user.email}`}
                        >
                          🗑️ Delete User
                        </button>
                      ) : (
                        <span className="text-[11px] text-[var(--color-text-subtle)] italic font-semibold px-2 py-1">
                          👑 Creator
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 bg-[var(--color-surface-subtle)]/40 rounded-xl border border-dashed border-[var(--color-border)]">
              <p className="text-base font-bold text-[var(--color-text-main)]">No users found</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {userSearchTerm ? `No match for "${userSearchTerm}". Clear search or add a new person.` : 'No registered users in this category.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: LIVE SESSIONS & WHO IS LOGGED IN RIGHT NOW */}
      {/* ============================================================== */}
      {activeTab === 'sessions' && (
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 sm:p-7 shadow-lg border border-[var(--color-border)] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-main)]">
                  Live Logged-In People & Active Sessions
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                Monitor students currently logged in with their <strong>Full Name</strong> and real-time activity status.
              </p>
            </div>

            <button
              onClick={() => loadData(true)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3.5 py-2 rounded-lg text-xs transition-colors"
            >
              <svg className={`w-4 h-4 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Sessions</span>
            </button>
          </div>

          {/* Active Sessions Grid / Table */}
          {sessions.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] font-bold text-[var(--color-text-main)] uppercase text-[11px] tracking-wider sticky top-0">
                  <tr>
                    <th scope="col" className="px-5 py-4">Connection State</th>
                    <th scope="col" className="px-5 py-4">Logged In Student (Full Name)</th>
                    <th scope="col" className="px-5 py-4">Country & Curriculum</th>
                    <th scope="col" className="px-5 py-4">Login Time</th>
                    <th scope="col" className="px-5 py-4">Last Activity Ping</th>
                    <th scope="col" className="px-5 py-4">Device & Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                  {sessions.map((session) => (
                    <tr key={session.sessionId} className="transition duration-150 hover:bg-[var(--color-surface-subtle)]/70">
                      {/* Connection State */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {session.isOnline ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            <span>Online Now</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            <span>Recent Session</span>
                          </span>
                        )}
                      </td>

                      {/* Logged in User with Full Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-700 font-bold flex items-center justify-center shrink-0 uppercase border border-emerald-400/30">
                            {(session.fullName || session.email)[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs sm:text-sm text-[var(--color-text-main)]">
                                {session.fullName || session.email.split('@')[0]}
                              </span>
                              {authService.isUserAdmin(session.email) && (
                                <span className="px-1.5 py-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 rounded">
                                  Admin
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[var(--color-text-subtle)] font-mono">
                              {session.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Country & Curriculum */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-semibold text-[var(--color-text-main)]">
                          {session.country || 'NG'}
                        </span>
                        <span className="text-[11px] text-[var(--color-text-subtle)] block">
                          {session.curriculum || 'Standard'}
                        </span>
                      </td>

                      {/* Login Time */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <span className="font-semibold text-[var(--color-text-main)]">
                          {formatTimeAgo(session.loginTime)}
                        </span>
                        <span className="block text-[10px] text-[var(--color-text-subtle)]">
                          {formatDateTime(session.loginTime)}
                        </span>
                      </td>

                      {/* Last Activity Ping */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <span className={`font-bold ${session.isOnline ? 'text-emerald-700 dark:text-emerald-400' : 'text-[var(--color-text-muted)]'}`}>
                          {formatTimeAgo(session.lastActiveTime)}
                        </span>
                      </td>

                      {/* Client / Device */}
                      <td className="px-5 py-4 text-xs font-mono text-[var(--color-text-subtle)] max-w-xs truncate" title={session.userAgent}>
                        {session.userAgent ? (
                          session.userAgent.includes('Mobile') ? '📱 Mobile Phone' : '💻 Computer / Laptop'
                        ) : 'Web App'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-surface-subtle)]/40 rounded-xl border border-dashed border-[var(--color-border)]">
              <p className="text-base font-bold text-[var(--color-text-main)]">No active sessions recorded yet</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                As students log in or use the platform, their live connections will appear here in real time.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: BROADCAST ANNOUNCEMENTS (Admin Only Delete) */}
      {/* ============================================================== */}
      {activeTab === 'announcements' && (
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 sm:p-7 shadow-lg border border-[var(--color-border)] space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-main)]">
              Global Header Announcements
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              Broadcast top-banner announcements to every student across all devices and countries. Only the administrator can delete or post announcements.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-[var(--color-text-secondary)]">Quick Templates:</span>
            <button
              onClick={() => setNewAnnouncement("🎉 Welcome to God's Glory Tutors! Explore our updated curriculum, live tutor assistance, and AI problem solver.")}
              className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded-md transition-colors"
            >
              + Welcome Message
            </button>
            <button
              onClick={() => setNewAnnouncement("📚 WAEC, JAMB, GCSE & Cambridge syllabus exam practice sets are now updated for 2026!")}
              className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded-md transition-colors"
            >
              + Exam Alert
            </button>
            <button
              onClick={() => setNewAnnouncement("⚡ All AI subject engines and visual diagram tools are operating at 100% capacity.")}
              className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded-md transition-colors"
            >
              + Status Alert
            </button>
          </div>

          <div className="space-y-3">
            <label htmlFor="announcement-textarea" className={commonLabelClasses}>
              Broadcast Announcement Message
            </label>
            <textarea
              id="announcement-textarea"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="e.g. Welcome students! Review our newest Mathematics and Sciences problem solver with photo diagram support."
              rows={3}
              className={`${commonSelectClasses} resize-y`}
            />
            <div className="text-right">
              <button onClick={() => handlePostAnnouncement()} className={commonButtonClasses}>
                Post Broadcast Announcement
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <h3 className="text-sm font-bold text-[var(--color-text-main)] mb-3">Currently Active Announcements</h3>
            {announcements.length > 0 ? (
              <ul className="space-y-3">
                {announcements.map((ann) => (
                  <li key={ann.id} className="p-4 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)] flex justify-between items-start gap-4 shadow-xs">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[var(--color-text-main)] leading-relaxed">{ann.content}</p>
                      <p className="text-[11px] text-[var(--color-text-subtle)] mt-1.5">
                        Posted on {new Date(ann.timestamp).toLocaleString()} ({formatTimeAgo(ann.timestamp)})
                      </p>
                    </div>
                    <button
                      onClick={() => setAnnouncementPendingDeletion(ann.id)}
                      className="text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 px-3 py-1.5 rounded-lg border border-red-300 transition-colors shrink-0"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[var(--color-text-subtle)] py-6 text-xs">No active announcements currently posted.</p>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: QUIZ SCORES & LEADERBOARD */}
      {/* ============================================================== */}
      {activeTab === 'scores' && (
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 sm:p-7 shadow-lg border border-[var(--color-border)] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-main)]">
                Student Quiz Submissions & Leaderboard
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                Persistent results from student quiz challenges.
              </p>
            </div>
            {scores.length > 0 && (
              <button
                onClick={handleClearScoreboard}
                className="text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 bg-red-50 px-3.5 py-2 rounded-lg transition-colors"
              >
                Reset Leaderboard
              </button>
            )}
          </div>

          {scores.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] font-bold text-[var(--color-text-main)] uppercase text-[11px]">
                  <tr>
                    <th scope="col" className="px-5 py-4">Rank</th>
                    <th scope="col" className="px-5 py-4">Student</th>
                    <th scope="col" className="px-5 py-4">Subject</th>
                    <th scope="col" className="px-5 py-4">Level</th>
                    <th scope="col" className="px-5 py-4">Score</th>
                    <th scope="col" className="px-5 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                  {scores.slice(0, 25).map((scoreItem, idx) => (
                    <tr key={scoreItem.id} className="transition duration-150 hover:bg-[var(--color-surface-subtle)]/70">
                      <td className="px-5 py-4 font-black text-sm">
                        {idx === 0 ? '🥇 1st' : idx === 1 ? '🥈 2nd' : idx === 2 ? '🥉 3rd' : `#${idx + 1}`}
                      </td>
                      <td className="px-5 py-4 font-bold text-[var(--color-text-main)]">{scoreItem.email}</td>
                      <td className="px-5 py-4">{scoreItem.subject}</td>
                      <td className="px-5 py-4 text-xs">{scoreItem.level}</td>
                      <td className="px-5 py-4 font-black text-[var(--color-accent)]">{scoreItem.score} pts</td>
                      <td className="px-5 py-4 text-xs">{new Date(scoreItem.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-[var(--color-text-subtle)] py-10 text-xs">No quiz scores recorded yet.</p>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* IN-APP USER DELETION CONFIRMATION MODAL (100% RELIABLE) */}
      {/* ============================================================== */}
      {userPendingDeletion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setUserPendingDeletion(null)}>
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-2xl p-6 sm:p-7 w-full max-w-md border-2 border-red-500/50 text-[var(--color-text-main)] space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-red-600">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-black">Confirm Permanent User Deletion</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
              Are you sure you want to permanently delete this student account?
            </p>

            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl space-y-1">
              <p className="text-sm font-extrabold text-[var(--color-text-main)]">
                {userPendingDeletion.fullName || userPendingDeletion.email.split('@')[0]}
              </p>
              <p className="text-xs font-mono text-[var(--color-text-subtle)]">
                {userPendingDeletion.email}
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Country: {userPendingDeletion.country || 'NG'} · Syllabus: {userPendingDeletion.curriculum || 'Standard'}
              </p>
            </div>

            <p className="text-[11px] text-red-600 font-semibold">
              Warning: This will immediately delete their login credentials, active sessions, and test history. This action cannot be reversed.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setUserPendingDeletion(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-surface-subtle)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteUser}
                disabled={isDeletingUser}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                {isDeletingUser ? 'Deleting...' : '🗑️ Yes, Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* IN-APP ANNOUNCEMENT DELETION CONFIRMATION MODAL */}
      {/* ============================================================== */}
      {announcementPendingDeletion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setAnnouncementPendingDeletion(null)}>
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-2xl p-6 sm:p-7 w-full max-w-md border border-[var(--color-border)] text-[var(--color-text-main)] space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-red-600">Delete Announcement?</h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              This announcement will be permanently removed from all student screens.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAnnouncementPendingDeletion(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--color-border)] text-[var(--color-text-main)]"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteAnnouncement(announcementPendingDeletion)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xs"
              >
                Delete Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD PERSON MANUALLY WITH FULL NAME */}
      {/* ============================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setIsAddUserModalOpen(false)}>
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-[var(--color-border)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-[var(--color-text-main)]">Add New Student / Person</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] font-bold text-lg">×</button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className={commonLabelClasses}>Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chukwuemeka Emmanuel"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className={commonSelectClasses}
                  autoFocus
                />
              </div>

              <div>
                <label className={commonLabelClasses}>Student Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={commonSelectClasses}
                />
              </div>

              <div>
                <label className={commonLabelClasses}>Temporary Password</label>
                <input
                  type="password"
                  placeholder="Defaults to studentPass2026"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={commonSelectClasses}
                />
              </div>

              <div>
                <label className={commonLabelClasses}>Country & Educational Framework</label>
                <select
                  value={newCountry}
                  onChange={(e) => {
                    setNewCountry(e.target.value);
                    const found = COUNTRIES.find(c => c.code === e.target.value);
                    if (found) setNewCurriculum(found.curriculumName);
                  }}
                  className={commonSelectClasses}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={commonLabelClasses}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className={commonSelectClasses}
                />
              </div>

              <div>
                <label className={commonLabelClasses}>Curriculum</label>
                <input
                  type="text"
                  value={newCurriculum}
                  onChange={(e) => setNewCurriculum(e.target.value)}
                  className={commonSelectClasses}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingUser}
                  className={commonButtonClasses}
                >
                  {isAddingUser ? 'Adding...' : 'Add User to Directory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
