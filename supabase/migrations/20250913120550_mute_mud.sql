/*
  # Create Waste Management System Tables

  1. New Tables
    - `waste_reports` - Store AI waste classification reports
    - `illegal_dumping_zones` - Track illegal dumping locations
    - `notifications` - System notifications
    - `waste_items` - Waste disposal guidelines database

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each user type
    - Create indexes for performance

  3. Storage
    - Create waste-images bucket for storing uploaded images
*/

-- Create waste_reports table
CREATE TABLE IF NOT EXISTS waste_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  image_url text NOT NULL,
  waste_type text NOT NULL CHECK (waste_type IN ('Plastic', 'Organic', 'E-Waste', 'Glass', 'Metal', 'Paper', 'Textile', 'Biomedical', 'General')),
  disposal_method text,
  latitude numeric(10,8),
  longitude numeric(11,8),
  confidence_score numeric(3,2),
  points_awarded integer DEFAULT 0,
  is_illegal_dumping boolean DEFAULT false,
  verified_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create illegal_dumping_zones table
CREATE TABLE IF NOT EXISTS illegal_dumping_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  radius_meters integer DEFAULT 100,
  municipality_id uuid,
  severity_level text DEFAULT 'medium' CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  report_id uuid,
  priority text DEFAULT 'medium',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create waste_items table for disposal guidelines
CREATE TABLE IF NOT EXISTS waste_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  instructions text NOT NULL,
  local_notes text,
  is_recyclable boolean DEFAULT false,
  is_compostable boolean DEFAULT false,
  is_hazardous boolean DEFAULT false,
  keywords text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE waste_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE illegal_dumping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_items ENABLE ROW LEVEL SECURITY;

-- Create policies for waste_reports
CREATE POLICY "Users can create their own waste reports"
  ON waste_reports
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own waste reports"
  ON waste_reports
  FOR SELECT
  TO public
  USING (auth.uid() = user_id OR auth.uid() = verified_by);

CREATE POLICY "Users can update their own waste reports"
  ON waste_reports
  FOR UPDATE
  TO public
  USING (auth.uid() = user_id OR auth.uid() = verified_by);

-- Create policies for illegal_dumping_zones
CREATE POLICY "Anyone can view illegal dumping zones"
  ON illegal_dumping_zones
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage illegal zones"
  ON illegal_dumping_zones
  FOR ALL
  TO public
  USING (auth.role() = 'authenticated');

-- Create policies for notifications
CREATE POLICY "Authenticated users can view notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for waste_items
CREATE POLICY "Waste items are viewable by everyone"
  ON waste_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage waste items"
  ON waste_items
  FOR ALL
  TO public
  USING (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waste_reports_user_id ON waste_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_waste_reports_created_at ON waste_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_waste_reports_illegal_dumping ON waste_reports(is_illegal_dumping);
CREATE INDEX IF NOT EXISTS idx_waste_reports_verified_by ON waste_reports(verified_by);

CREATE INDEX IF NOT EXISTS idx_illegal_dumping_zones_coords ON illegal_dumping_zones(latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);

CREATE INDEX IF NOT EXISTS idx_waste_items_name ON waste_items USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_waste_items_keywords ON waste_items USING gin(keywords);

-- Insert some sample illegal dumping zones
INSERT INTO illegal_dumping_zones (zone_name, latitude, longitude, radius_meters, severity_level) VALUES
  ('Industrial Zone A', 40.7829, -73.9654, 150, 'high'),
  ('Riverside Park', 40.7834, -73.9662, 100, 'medium'),
  ('Construction Site B', 40.7505, -73.9934, 200, 'critical'),
  ('Highway Underpass', 40.7589, -73.9851, 120, 'high')
ON CONFLICT (zone_name) DO NOTHING;

-- Insert sample waste disposal guidelines
INSERT INTO waste_items (name, category, instructions, is_recyclable, is_compostable, is_hazardous, keywords) VALUES
  ('Plastic Bottles', 'Plastic', 'Clean and place in Blue Recycling Bin. Remove caps and labels.', true, false, false, ARRAY['bottle', 'plastic', 'water', 'soda']),
  ('Food Scraps', 'Organic', 'Compost at home or place in Green Organic Waste Bin.', false, true, false, ARRAY['food', 'organic', 'scraps', 'vegetable']),
  ('Old Phones', 'E-Waste', 'Take to certified E-Waste collection center. Never throw in regular trash.', true, false, true, ARRAY['phone', 'mobile', 'electronic', 'battery']),
  ('Glass Jars', 'Glass', 'Clean and place in designated Glass Recycling Bin.', true, false, false, ARRAY['glass', 'jar', 'bottle', 'container']),
  ('Aluminum Cans', 'Metal', 'Clean and place in Metal Recycling Bin. Highly recyclable!', true, false, false, ARRAY['can', 'aluminum', 'metal', 'drink']),
  ('Newspapers', 'Paper', 'Clean, dry paper goes in Paper Recycling Bin.', true, false, false, ARRAY['paper', 'newspaper', 'magazine', 'cardboard']),
  ('Old Clothes', 'Textile', 'Donate wearable clothes or take to textile recycling center.', true, false, false, ARRAY['clothes', 'textile', 'fabric', 'shirt']),
  ('Medical Waste', 'Biomedical', 'DANGER: Take to hospital or pharmacy for safe disposal.', false, false, true, ARRAY['medical', 'syringe', 'medicine', 'hospital'])
ON CONFLICT (name) DO NOTHING;

-- Create storage bucket for waste images
INSERT INTO storage.buckets (id, name, public) VALUES ('waste-images', 'waste-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for waste images
CREATE POLICY "Authenticated users can upload waste images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'waste-images');

CREATE POLICY "Anyone can view waste images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'waste-images');