import React, { useState, useEffect } from 'react';
import * as authService from '../services/authService';
import * as announcementService from '../services/announcementService';
import { getScores, saveScores } from '../services/scoreService';
import { User, Announcement, Score } from '../types';

interface AdminPageProps {
  onReturnToApp?: (mode?: 'solver' | 'quiz' | 'scoreboard') => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onReturnToApp }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    try {
      const allUsers = authService.getAllUsers();
      setUsers(allUsers);
      const allAnnouncements = announcementService.getAnnouncements();
      setAnnouncements(allAnnouncements);
      const allScores = getScores();
      setScores(allScores);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setActionFeedback({ type, message });
    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  const handleDeleteUser = (email: string) => {
    if (window.confirm(`Are you sure you want to delete the user "${email}"? This will remove all their quiz scores and history. This action cannot be undone.`)) {
      const result = authService.deleteUser(email);
      if (result.success) {
        setUsers(currentUsers => currentUsers.filter(u => u.email !== email));
        setScores(currentScores => currentScores.filter(s => s.email !== email));
        showFeedback('success', result.message);
      } else {
        showFeedback('error', result.message);
      }
    }
  };

  const handlePostAnnouncement = (textOverride?: string) => {
    const textToPost = textOverride || newAnnouncement;
    if (!textToPost.trim()) {
      showFeedback('error', "Announcement content cannot be empty.");
      return;
    }
    const updatedAnnouncements = announcementService.addAnnouncement(textToPost);
    setAnnouncements(updatedAnnouncements);
    setNewAnnouncement('');
    showFeedback('success', "New announcement posted successfully!");
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      const updatedAnnouncements = announcementService.deleteAnnouncement(id);
      setAnnouncements(updatedAnnouncements);
      showFeedback('success', "Announcement deleted successfully.");
    }
  };

  const handleClearScoreboard = () => {
    if (window.confirm("Are you sure you want to reset all scoreboard records?")) {
      saveScores([]);
      setScores([]);
      showFeedback('success', "Scoreboard reset successfully.");
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (user.phoneNumber && user.phoneNumber.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
    (user.country && user.country.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
    (user.curriculum && user.curriculum.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  const commonSelectClasses = "w-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition placeholder:text-[var(--color-text-subtle)] disabled:opacity-50";
  const commonLabelClasses = "block text-sm font-bold text-[var(--color-text-secondary)] mb-2";
  const commonButtonClasses = "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-2 px-4 rounded-md transition-all duration-200 disabled:bg-[var(--color-accent-disabled)] disabled:cursor-not-allowed";

  if (isLoading) {
    return <div className="text-center p-10 text-[var(--color-text-muted)] font-medium">Loading admin portal data...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Admin Top Header & Quick Return Bar */}
      <div className="bg-[var(--color-surface)] border-2 border-[var(--color-accent)]/40 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Creator & Super Admin Control Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-main)] mt-1">
            Admin Management Portal
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Primary Administrator: <strong className="text-[var(--color-accent)] font-mono">{authService.PRIMARY_ADMIN_EMAIL}</strong>. You have unrestricted access to manage users, monitor worldwide curriculums, and use all app features without hindrance.
          </p>
        </div>

        {/* Return Button */}
        {onReturnToApp && (
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onReturnToApp('solver')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 px-5 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Return to App (Personal Use)</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Switch Toolbar */}
      <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Quick Personal App Jump:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onReturnToApp?.('solver')}
            className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-md transition-colors"
          >
            📚 Problem Solver
          </button>
          <button
            onClick={() => onReturnToApp?.('quiz')}
            className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-md transition-colors"
          >
            🧠 Quiz Fun
          </button>
          <button
            onClick={() => onReturnToApp?.('scoreboard')}
            className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-md transition-colors"
          >
            🏆 Scoreboard
          </button>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className={`p-4 rounded-lg text-sm font-semibold flex items-center justify-between shadow-md transition-all ${
          actionFeedback.type === 'success' 
            ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-800' 
            : 'bg-rose-500/15 border border-rose-500/40 text-rose-800'
        }`}>
          <span>{actionFeedback.message}</span>
          <button onClick={() => setActionFeedback(null)} className="text-xs underline ml-2">Dismiss</button>
        </div>
      )}

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm">
          <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase">Total Registered Users</p>
          <p className="text-3xl font-extrabold text-[var(--color-text-main)] mt-2">{users.length}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">1 Primary Admin, {Math.max(0, users.length - 1)} Students</p>
        </div>
        <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm">
          <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase">Active Announcements</p>
          <p className="text-3xl font-extrabold text-[var(--color-accent)] mt-2">{announcements.length}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Broadcasted across header banners</p>
        </div>
        <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm">
          <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase">Quiz Submissions Logged</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">{scores.length}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Saved in global leaderboard</p>
        </div>
        <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-sm">
          <p className="text-xs font-bold text-[var(--color-text-subtle)] uppercase">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xl font-bold text-emerald-700">100% Operational</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">AI Engines & Database Ready</p>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-lg border border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)]">Registered Users Directory</h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Manage accounts registered on God's Glory Tutors platform.</p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search user by email..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] font-bold text-[var(--color-text-main)]">
              <tr>
                <th scope="col" className="px-4 py-3.5">User Email</th>
                <th scope="col" className="px-4 py-3.5">Country & Curriculum</th>
                <th scope="col" className="px-4 py-3.5">Phone Number</th>
                <th scope="col" className="px-4 py-3.5">Role</th>
                <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
              {filteredUsers.map((user) => (
                <tr key={user.email} className="transition duration-150 hover:bg-[var(--color-surface-subtle)]/60">
                  <td className="px-4 py-3.5 font-medium text-[var(--color-text-main)]">
                    <div className="flex items-center gap-1.5">
                      {user.isAdmin && <span title="App Creator">👑</span>}
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-semibold text-[var(--color-text-main)]">
                      {user.country ? user.country.toUpperCase() : 'NG'}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-subtle)] block">
                      {user.curriculum || 'National Standard'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-xs">
                    {user.phoneNumber || <span className="text-[var(--color-text-subtle)]">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    {user.isAdmin ? (
                      <span className="px-2 py-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-full inline-flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        App Creator
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-medium text-slate-700 bg-slate-200/80 rounded-full">
                        Student User
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right">
                    {!user.isAdmin ? (
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-[11px] text-[var(--color-text-subtle)] italic font-semibold">Creator Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <p className="text-center text-[var(--color-text-subtle)] py-8 text-sm">
            {userSearchTerm ? `No users matching "${userSearchTerm}"` : "No registered users found."}
          </p>
        )}
      </div>

      {/* Announcement Section */}
      <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-lg border border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-2">Broadcast Announcements</h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          Post top banner notifications that will be seen by all students on their app header.
        </p>

        {/* Preset Templates */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Quick Presets:</span>
          <button
            onClick={() => setNewAnnouncement("🎉 Welcome to God's Glory Tutors! Explore our updated curriculum and AI problem solver.")}
            className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded transition-colors"
          >
            + Welcome Note
          </button>
          <button
            onClick={() => setNewAnnouncement("📚 New university and high school topics are now live! Try taking a quiz today.")}
            className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded transition-colors"
          >
            + New Content Alert
          </button>
          <button
            onClick={() => setNewAnnouncement("⚡ Maintenance complete! All AI subject tutors are operating at peak speed.")}
            className="text-xs bg-[var(--color-surface-subtle)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-main)] px-2.5 py-1 rounded transition-colors"
          >
            + System Ready
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="announcement-textarea" className={commonLabelClasses}>
              Announcement Message
            </label>
            <textarea
              id="announcement-textarea"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="e.g., God's Glory Tutors exam preparation quizzes are updated for Year 2026!"
              rows={3}
              className={`${commonSelectClasses} resize-y`}
            />
          </div>
          <div className="text-right">
            <button onClick={() => handlePostAnnouncement()} className={commonButtonClasses}>
              Post Broadcast
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-md font-bold text-[var(--color-text-main)] mb-4">Active Posted Announcements</h3>
          {announcements.length > 0 ? (
            <ul className="space-y-3">
              {announcements.map((ann) => (
                <li key={ann.id} className="p-4 bg-[var(--color-surface-subtle)] rounded-lg border border-[var(--color-border)]/70 flex justify-between items-start gap-4 shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-main)]">{ann.content}</p>
                    <p className="text-xs text-[var(--color-text-subtle)] mt-1">
                      Posted on {new Date(ann.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded transition-colors flex-shrink-0"
                    aria-label="Delete announcement"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-[var(--color-text-subtle)] py-4 text-sm">No active announcements currently posted.</p>
          )}
        </div>
      </div>

      {/* Leaderboard & Scoreboard Control Section */}
      <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-lg border border-[var(--color-border)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)]">Quiz Scoreboard Overview</h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Summary of student quiz performances and scores.</p>
          </div>
          {scores.length > 0 && (
            <button
              onClick={handleClearScoreboard}
              className="text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 bg-red-50/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Reset Leaderboard
            </button>
          )}
        </div>

        {scores.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] font-semibold text-[var(--color-text-main)]">
                <tr>
                  <th scope="col" className="px-6 py-3">Student Name / Email</th>
                  <th scope="col" className="px-6 py-3">Subject</th>
                  <th scope="col" className="px-6 py-3">Score</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-muted)]">
                {scores.slice(0, 10).map((scoreItem) => (
                  <tr key={scoreItem.id}>
                    <td className="px-6 py-3 font-medium text-[var(--color-text-main)]">{scoreItem.email}</td>
                    <td className="px-6 py-3">{scoreItem.subject}</td>
                    <td className="px-6 py-3 font-bold text-[var(--color-accent)]">{scoreItem.score} pts</td>
                    <td className="px-6 py-3 text-xs">{new Date(scoreItem.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-subtle)] py-6 text-sm">No quiz scores recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
