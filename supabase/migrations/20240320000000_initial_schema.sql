-- Create custom types
CREATE TYPE event_status AS ENUM ('draft', 'published', 'completed', 'cancelled');
CREATE TYPE rsvp_status AS ENUM ('pending', 'confirmed', 'declined');
CREATE TYPE gift_status AS ENUM ('available', 'reserved', 'purchased');

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  status event_status DEFAULT 'draft' NOT NULL,
  subdomain TEXT UNIQUE,
  theme_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT events_subdomain_check CHECK (subdomain ~* '^[a-z0-9-]+$')
);

-- Create guests table
CREATE TABLE guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  rsvp_status rsvp_status DEFAULT 'pending' NOT NULL,
  dietary_restrictions TEXT,
  number_of_guests INTEGER DEFAULT 1 NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(event_id, email)
);

-- Create gift_categories table
CREATE TABLE gift_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create gifts table
CREATE TABLE gifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES gift_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  status gift_status DEFAULT 'available' NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create gift_purchases table
CREATE TABLE gift_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_id UUID REFERENCES gifts(id) NOT NULL,
  guest_id UUID REFERENCES guests(id),
  quantity INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  commission_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_purchases ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Creators can view their events"
  ON events FOR SELECT
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their events"
  ON events FOR UPDATE
  USING (auth.uid() = creator_id);

-- Guests policies
CREATE POLICY "Event creators can view guests"
  ON guests FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM events WHERE id = guests.event_id AND creator_id = auth.uid()
  ));

CREATE POLICY "Anyone can create guest entries for published events"
  ON guests FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM events WHERE id = event_id AND status = 'published'
  ));

-- Gift categories policies
CREATE POLICY "Anyone can view gift categories of published events"
  ON gift_categories FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM events WHERE id = gift_categories.event_id AND status = 'published'
  ));

CREATE POLICY "Event creators can manage gift categories"
  ON gift_categories FOR ALL
  USING (EXISTS (
    SELECT 1 FROM events WHERE id = gift_categories.event_id AND creator_id = auth.uid()
  ));

-- Gifts policies
CREATE POLICY "Anyone can view gifts of published events"
  ON gifts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM events WHERE id = gifts.event_id AND status = 'published'
  ));

CREATE POLICY "Event creators can manage gifts"
  ON gifts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM events WHERE id = gifts.event_id AND creator_id = auth.uid()
  ));

-- Gift purchases policies
CREATE POLICY "Guests can view their own purchases"
  ON gift_purchases FOR SELECT
  USING (guest_id IN (
    SELECT id FROM guests WHERE email = auth.email()
  ));

CREATE POLICY "Anyone can create purchases"
  ON gift_purchases FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM gifts 
    JOIN events ON gifts.event_id = events.id 
    WHERE gifts.id = gift_id 
    AND events.status = 'published'
  ));

-- Create functions and triggers
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gift_categories_updated_at
  BEFORE UPDATE ON gift_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gifts_updated_at
  BEFORE UPDATE ON gifts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gift_purchases_updated_at
  BEFORE UPDATE ON gift_purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 