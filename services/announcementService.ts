import { Announcement } from '../types';

const ANNOUNCEMENTS_KEY = 'gods_glory_tutors_announcements';

// Helper to get all announcements from localStorage, sorted by most recent
export const getAnnouncements = (): Announcement[] => {
  try {
    const announcements = localStorage.getItem(ANNOUNCEMENTS_KEY);
    const parsedAnnouncements: Announcement[] = announcements ? JSON.parse(announcements) : [];
    // Sort by timestamp descending to get the newest first
    return parsedAnnouncements.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Failed to retrieve announcements:", error);
    return [];
  }
};

// Helper to save announcements back to localStorage
const saveAnnouncements = (announcements: Announcement[]): void => {
  try {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  } catch (error) {
    console.error("Failed to save announcements:", error);
  }
};

// Add a new announcement
export const addAnnouncement = (content: string): Announcement[] => {
  if (!content.trim()) return getAnnouncements();

  const announcements = getAnnouncements();
  const newAnnouncement: Announcement = {
    id: new Date().toISOString() + Math.random(),
    content: content,
    timestamp: Date.now(),
  };

  // Add the new announcement to the beginning of the array
  const updatedAnnouncements = [newAnnouncement, ...announcements];
  saveAnnouncements(updatedAnnouncements);
  return updatedAnnouncements;
};

// Delete an announcement by its ID
export const deleteAnnouncement = (id: string): Announcement[] => {
  const announcements = getAnnouncements();
  const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
  saveAnnouncements(updatedAnnouncements);
  return updatedAnnouncements;
};
