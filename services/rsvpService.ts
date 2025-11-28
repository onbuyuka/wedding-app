import { RsvpData } from '../types';

const STORAGE_KEY = 'wedding_rsvps';

export const saveRsvp = async (data: Omit<RsvpData, 'id' | 'timestamp'>): Promise<RsvpData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newRsvp: RsvpData = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };

  const existing = getRsvps();
  const updated = [...existing, newRsvp];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newRsvp;
};

export const getRsvps = (): RsvpData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
