import { EventList } from '@/components/events/EventList';

export const metadata = {
  title: 'Events Dashboard | Barebat',
  description: 'Manage your Bar and Bat Mitzvah events',
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <EventList />
    </div>
  );
} 