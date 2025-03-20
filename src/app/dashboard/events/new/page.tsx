import { EventForm } from '@/components/events/EventForm';

export const metadata = {
  title: 'Create New Event | Barebat',
  description: 'Create a new Bar or Bat Mitzvah event',
};

export default function NewEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to create your Bar or Bat Mitzvah event.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <EventForm />
        </div>
      </div>
    </div>
  );
} 