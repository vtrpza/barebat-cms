import { createClient } from '@/lib/supabase/server';
import { Event } from '@/types/events';

export async function createEvent(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event | null> {
  const supabase = await createClient();
  
  const { data: createdEvent, error } = await supabase
    .from('events')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    return null;
  }

  return createdEvent;
}

export async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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