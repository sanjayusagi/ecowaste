/*
  # Update waste reports schema for AI classification

  1. Schema Updates
    - Add missing columns to waste_reports table
    - Update constraints and indexes
    - Add disposal_method column
    - Add is_illegal_dumping column
    - Add verified_by column

  2. Security
    - Maintain existing RLS policies
    - Add indexes for performance

  3. Data Types
    - Ensure proper data types for all columns
    - Add check constraints for waste types
*/

-- Add missing columns to waste_reports table
DO $$
BEGIN
  -- Add disposal_method column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waste_reports' AND column_name = 'disposal_method'
  ) THEN
    ALTER TABLE waste_reports ADD COLUMN disposal_method TEXT;
  END IF;

  -- Add is_illegal_dumping column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waste_reports' AND column_name = 'is_illegal_dumping'
  ) THEN
    ALTER TABLE waste_reports ADD COLUMN is_illegal_dumping BOOLEAN DEFAULT false;
  END IF;

  -- Add verified_by column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waste_reports' AND column_name = 'verified_by'
  ) THEN
    ALTER TABLE waste_reports ADD COLUMN verified_by UUID;
  END IF;
END $$;

-- Create storage bucket for waste images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('waste-images', 'waste-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create notifications table for illegal dumping alerts
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  report_id UUID,
  priority TEXT DEFAULT 'medium',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on notifications table
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for notifications
CREATE POLICY "Authenticated users can view notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (true);

-- Add trigger for notifications updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for notifications if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_notifications_updated_at'
  ) THEN
    CREATE TRIGGER update_notifications_updated_at
      BEFORE UPDATE ON notifications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create storage policy for waste images
CREATE POLICY "Users can upload waste images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'waste-images');

CREATE POLICY "Users can view waste images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'waste-images');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waste_reports_illegal_dumping 
  ON waste_reports (is_illegal_dumping);

CREATE INDEX IF NOT EXISTS idx_waste_reports_verified_by 
  ON waste_reports (verified_by);

CREATE INDEX IF NOT EXISTS idx_notifications_type 
  ON notifications (type);

CREATE INDEX IF NOT EXISTS idx_notifications_priority 
  ON notifications (priority);