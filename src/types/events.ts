export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  privacy: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
  subdomain: string | null;
  max_guests: number;
  theme_config: {
    rsvp_enabled: boolean;
    theme: {
      primary_color: string;
      secondary_color: string;
      font_family: string;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  type: 'BAR_MITZVAH' | 'BAT_MITZVAH';
  privacy: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
  max_guests: number;
  subdomain: string;
} 