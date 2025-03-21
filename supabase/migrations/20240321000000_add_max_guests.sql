-- Add maxGuests column to events table
ALTER TABLE events ADD COLUMN max_guests INTEGER;

-- Update existing rows to have a default value
UPDATE events SET max_guests = 100 WHERE max_guests IS NULL;

-- Make the column NOT NULL after setting defaults
ALTER TABLE events ALTER COLUMN max_guests SET NOT NULL;

-- Add a check constraint to ensure max_guests is positive
ALTER TABLE events ADD CONSTRAINT events_max_guests_check CHECK (max_guests > 0); 