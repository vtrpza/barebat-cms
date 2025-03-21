'use client';

import { createClient } from '@supabase/supabase-js';
import { Event } from '@/types/events';

// Client-only Supabase client
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
};

// Client-side event operations
export class ClientEvents {
  static async getByUser(userId: string): Promise<Event[]> {
    if (!userId) {
      console.warn('No user ID provided to getEventsByUser');
      return [];
    }

    const supabase = createBrowserClient();
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  static async subscribe(eventId: string, callback: (event: Event) => void): Promise<() => void> {
    const supabase = createBrowserClient();
    
    const subscription = supabase
      .channel(`event-${eventId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'events',
          filter: `id=eq.${eventId}` 
        }, 
        (payload) => {
          callback(payload.new as Event);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }
}
