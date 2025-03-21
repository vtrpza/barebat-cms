import { createClient } from '@/lib/supabase/config';
import { Event, EventFormData } from '@/types/event';

export async function createEvent(data: EventFormData, userId: string): Promise<Event> {
  const supabase = createClient();
  
  const event = {
    ...data,
    userId,
    status: 'DRAFT' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const { data: createdEvent, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create event: ${error.message}`);
  }

  return createdEvent as Event;
}

export async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('id')
    .eq('subdomain', subdomain)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check subdomain: ${error.message}`);
  }

  return data === null;
}

export async function getEventsByUser(userId: string): Promise<Event[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return data as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return data;
}

export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating event:", error);
    return null;
  }

  return data;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting event:", error);
    return false;
  }

  return true;
} 