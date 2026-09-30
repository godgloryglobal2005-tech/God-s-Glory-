import { Announcement } from '../types';
import { PRIMARY_ADMIN_EMAIL, isUserAdmin, getCurrentUser } from './authService';

const ANNOUNCEMENTS_KEY = 'gods_glory_tutors_announcements';

// Helper to get all announcements from localStorage, sorted by most recent
export const getAnnouncements = (): Announcement[] => {
  try {
    const announcements = localStorage.getItem(ANNOUNCEMENTS_KEY);
    const parsedAnnouncements: Announcement[] = announcements ? JSON.parse(announcements) : [];
    return parsedAnnouncements.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    return [];
  }
};

// Async fetch from server to get global announcements
export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const res = await fetch('/api/announcements');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        saveAnnouncements(data.announcements);
        return data.announcements;
      }
    }
  } catch (e) {
    // fallback
  }
  return getAnnouncements();
};

// Helper to save announcements back to localStorage
export const saveAnnouncements = (announcements: Announcement[]): void => {
  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  } catch (error) {
    console.error("Failed to save announcements:", error);
  }
};

// Add a new announcement (Strictly Admin only)
export const addAnnouncement = async (content: string, adminEmail?: string): Promise<Announcement[]> => {
  if (!content.trim()) return getAnnouncements();

  const current = getCurrentUser();
  const effectiveEmail = adminEmail || current?.email || PRIMARY_ADMIN_EMAIL;

  if (!isUserAdmin(effectiveEmail)) {
    console.warn("Permission denied: Only administrator can post announcements.");
    return getAnnouncements();
  }

  try {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-email': effectiveEmail,
      },
      body: JSON.stringify({ content: content.trim(), adminEmail: effectiveEmail }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        saveAnnouncements(data.announcements);
        return data.announcements;
      }
    }
  } catch (e) {
    console.warn("Could not post announcement to server:", e);
  }

  // Local fallback for admin
  const announcements = getAnnouncements();
  const newAnnouncement: Announcement = {
    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    content: content.trim(),
    timestamp: Date.now(),
  };

  const updatedAnnouncements = [newAnnouncement, ...announcements];
  saveAnnouncements(updatedAnnouncements);
  return updatedAnnouncements;
};

// Delete an announcement by its ID (Strictly Admin only)
export const deleteAnnouncement = async (id: string, adminEmail?: string): Promise<Announcement[]> => {
  const current = getCurrentUser();
  const effectiveEmail = adminEmail || current?.email || PRIMARY_ADMIN_EMAIL;

  if (!isUserAdmin(effectiveEmail)) {
    alert("Permission Denied: Only the administrator has the rights to delete announcements.");
    return getAnnouncements();
  }

  try {
    const res = await fetch(`/api/announcements/${encodeURIComponent(id)}`, { 
      method: 'DELETE',
      headers: {
        'x-admin-email': effectiveEmail,
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        saveAnnouncements(data.announcements);
        return data.announcements;
      }
    } else {
      const err = await res.json();
      alert(err.message || 'Cannot delete announcement.');
    }
  } catch (e) {
    console.warn("Error deleting announcement on server:", e);
  }

  const announcements = getAnnouncements();
  const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
  saveAnnouncements(updatedAnnouncements);
  return updatedAnnouncements;
};
