import { notFound } from "next/navigation";
import { EventDetails } from "@/components/events/EventDetails";
import { getEventById } from "@/lib/supabase/events";
import { Event } from "@/types/events";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const eventData = await getEventById(id);

  if (!eventData) {
    notFound();
  }

  // Ensure the data is properly serialized for client components
  const event: Event = {
    id: eventData.id,
    title: eventData.title,
    description: eventData.description || '',
    event_date: eventData.event_date,
    location: eventData.location,
    subdomain: eventData.subdomain,
    status: eventData.status,
    user_id: eventData.user_id,
    created_at: eventData.created_at,
    updated_at: eventData.updated_at,
    theme_config: {
      rsvp_enabled: eventData.theme_config?.rsvp_enabled ?? false,
      theme: {
        primary_color: eventData.theme_config?.theme?.primary_color ?? '#000000',
        secondary_color: eventData.theme_config?.theme?.secondary_color ?? '#ffffff',
        font_family: eventData.theme_config?.theme?.font_family ?? 'Inter',
      }
    },
    max_guests: eventData.max_guests ?? 100,
    privacy: eventData.privacy || 'PRIVATE'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
} 