export type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled'
export type RsvpStatus = 'pending' | 'confirmed' | 'declined'
export type GiftStatus = 'available' | 'reserved' | 'purchased'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  creator_id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  status: EventStatus
  subdomain: string | null
  theme_config: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Guest {
  id: string
  event_id: string
  email: string
  full_name: string
  phone: string | null
  rsvp_status: RsvpStatus
  dietary_restrictions: string | null
  number_of_guests: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface GiftCategory {
  id: string
  event_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Gift {
  id: string
  event_id: string
  category_id: string | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  status: GiftStatus
  quantity: number
  created_at: string
  updated_at: string
}

export interface GiftPurchase {
  id: string
  gift_id: string
  guest_id: string | null
  quantity: number
  total_amount: number
  stripe_payment_id: string | null
  commission_amount: number
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      events: {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>
      }
      guests: {
        Row: Guest
        Insert: Omit<Guest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Guest, 'id' | 'created_at' | 'updated_at'>>
      }
      gift_categories: {
        Row: GiftCategory
        Insert: Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GiftCategory, 'id' | 'created_at' | 'updated_at'>>
      }
      gifts: {
        Row: Gift
        Insert: Omit<Gift, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Gift, 'id' | 'created_at' | 'updated_at'>>
      }
      gift_purchases: {
        Row: GiftPurchase
        Insert: Omit<GiftPurchase, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GiftPurchase, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      event_status: EventStatus
      rsvp_status: RsvpStatus
      gift_status: GiftStatus
    }
  }
} 