/*
  # Fix Storage Policies

  1. Updates
    - Drop existing policies
    - Create new policies with correct bucket references
    - Enable RLS on storage.objects
  
  2. Security
    - Public read access for all buckets
    - Authenticated user upload/delete access
*/

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Projects" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload Projects" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete Projects" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Products" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload Products" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete Products" ON storage.objects;

-- Create new unified policies
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('carousel', 'projects', 'products'));

CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('carousel', 'projects', 'products')
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('carousel', 'projects', 'products')
  AND auth.role() = 'authenticated'
);