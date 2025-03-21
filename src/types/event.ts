import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().refine((str) => !isNaN(Date.parse(str)), {
    message: 'Invalid date format',
  }),
  location: z.object({
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().length(2, 'State must be 2 characters'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  }),
  type: z.enum(['BAR_MITZVAH', 'BAT_MITZVAH']),
  privacy: z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']),
  max_guests: z.number().min(1, 'Must allow at least 1 guest'),
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
});

export type { EventFormData, Event } from './events'; 