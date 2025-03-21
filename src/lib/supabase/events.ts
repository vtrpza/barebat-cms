import * as ServerActions from './server';
import { ClientEvents } from './client';
import type { Event } from '@/types/events';

// Re-export server-side functions for use in Server Components and API routes
export const {
  create: createEvent,
  getById: getEventById,
  getByUser: getEventsByUser,
  update: updateEvent,
  deleteEvent,
  checkSubdomain: checkSubdomainAvailability,
} = ServerActions;

// Re-export client-side functions for use in Client Components
export const {
  getByUser: getEventsByUserClient,
  subscribe: subscribeToEvent,
} = ClientEvents;

// Type exports
export type { Event }; 