'use server'

import { createClient } from '@supabase/supabase-js';
import { Event } from '@/types/events';

// Server-only Supabase client
export const createServerClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
};

// Helper function to normalize event data
const normalizeEvent = (event: Partial<Event>): Partial<Event> => ({
  ...event,
  event_date: event.event_date ? new Date(event.event_date).toISOString() : undefined,
  max_guests: event.max_guests ?? 100,
  theme_config: event.theme_config ? {
    rsvp_enabled: Boolean(event.theme_config.rsvp_enabled),
    theme: {
      primary_color: event.theme_config.theme?.primary_color ?? '#000000',
      secondary_color: event.theme_config.theme?.secondary_color ?? '#ffffff',
      font_family: event.theme_config.theme?.font_family ?? 'Inter',
    }
  } : undefined
});

// Server actions
export async function create(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event | null> {
  const supabase = await createServerClient();
  const normalizedData = normalizeEvent(data);

  const { data: event, error } = await supabase
    .from('events')
    .insert([normalizedData])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return null;
  }

  return event;
}

export async function getById(id: string): Promise<Event | null> {
  const supabase = await createServerClient();
  
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return event;
}

export async function getByUser(userId: string): Promise<Event[]> {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

export async function update(id: string, updates: Partial<Event>): Promise<Event | null> {
  const supabase = await createServerClient();
  const normalizedUpdates = normalizeEvent(updates);

  const { data: event, error } = await supabase
    .from('events')
    .update(normalizedUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return null;
  }

  return event;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const supabase = await createServerClient();
  
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  return !error;
}

export async function checkSubdomain(subdomain: string): Promise<boolean> {
  const supabase = await createServerClient();
  
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
