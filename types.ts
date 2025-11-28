export interface RsvpData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attending: boolean;
  plusOne: boolean;
  plusOneName?: string;
  dietaryRestrictions?: string;
  message?: string;
  timestamp: number;
}

export interface WeddingEventDetails {
  couple: {
    partner1: string;
    partner2: string;
  };
  date: string;
  time: string;
  location: {
    venue: string;
    address: string;
    mapLink: string;
  };
  schedule: {
    time: string;
    activity: string;
  }[];
  menu: {
    category: string;
    items: string[];
  }[];
  registryLink?: string;
}