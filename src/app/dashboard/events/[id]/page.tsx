import { notFound } from "next/navigation";
import { EventDetails } from "@/components/events/EventDetails";
import { getEventById } from "@/lib/supabase/events";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
} 