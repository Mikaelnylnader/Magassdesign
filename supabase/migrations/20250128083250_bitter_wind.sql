/*
  # Create Storage Buckets

  1. New Buckets
    - carousel: For carousel images
    - projects: For project images
    - products: For product images
  
  2. Security
    - Enable public read access
    - Enable authenticated user upload/delete
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('carousel', 'carousel', true),
  ('projects', 'projects', true),
  ('products', 'products', true);

-- Set up security policies for carousel bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'carousel');

CREATE POLICY "Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'carousel' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'carousel'
  AND auth.role() = 'authenticated'
);

-- Set up security policies for projects bucket
CREATE POLICY "Public Access Projects" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'projects');

CREATE POLICY "Auth Upload Projects" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'projects' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Auth Delete Projects" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'projects'
  AND auth.role() = 'authenticated'
);

-- Set up security policies for products bucket
CREATE POLICY "Public Access Products" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'products');

CREATE POLICY "Auth Upload Products" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Auth Delete Products" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'products'
  AND auth.role() = 'authenticated'
);