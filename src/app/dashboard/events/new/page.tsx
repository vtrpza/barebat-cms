import { EventForm } from '@/components/events/EventForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Event | Barebat CMS',
  description: 'Create a new bar/bat mitzvah event',
};

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Create New Event</h1>
      <EventForm />
    </div>
  );
} 