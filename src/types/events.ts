export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  subdomain: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  user_id: string;
  settings: {
    rsvp_enabled: boolean;
    max_guests: number | null;
    theme: {
      primary_color: string;
      secondary_color: string;
      font_family: string;
    };
  };
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  subdomain: string;
} 