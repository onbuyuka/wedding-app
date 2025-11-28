import { RsvpData } from '../types';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwX341qlBguBzusvRiCtnANK0z9ba6iKR4UE1u76hMKJKTda0xJYv6YwduNWlKSY31JjQ/exec';

export const saveRsvp = async (data: Omit<RsvpData, 'id' | 'timestamp'>): Promise<RsvpData> => {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Required for Google Apps Script
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // With no-cors mode, we can't read the response, but if no error was thrown, it likely succeeded
  const newRsvp: RsvpData = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };

  return newRsvp;
};

export const getRsvps = (): RsvpData[] => {
  // RSVPs are now stored in Google Sheets, not localStorage
  return [];
};
