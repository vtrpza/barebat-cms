-- Create event_privacy type
CREATE TYPE event_privacy AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- Add privacy column to events table
ALTER TABLE events ADD COLUMN privacy event_privacy DEFAULT 'PRIVATE' NOT NULL; 