import { notFound } from "next/navigation";
import { EventDetails } from "@/components/events/EventDetails";
import { getEventById } from "@/lib/supabase/events";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
} 