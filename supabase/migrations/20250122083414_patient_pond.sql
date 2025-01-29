/*
  # Add Pro features to existing tables

  1. Changes
    - Add full-text search capabilities to products and projects
    - Add database functions for advanced querying
    - Add materialized view for trending products

  2. Security
    - Maintain existing RLS policies
    - Add new policies for materialized view
*/

-- Enable full-text search for products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(category, '')), 'C')
) STORED;

CREATE INDEX IF NOT EXISTS products_search_idx ON products USING gin(search_vector);

-- Enable full-text search for projects
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(category, '')), 'C')
) STORED;

CREATE INDEX IF NOT EXISTS projects_search_idx ON projects USING gin(search_vector);

-- Create materialized view for trending products
CREATE MATERIALIZED VIEW IF NOT EXISTS trending_products AS
SELECT 
  p.*,
  COUNT(*) as view_count
FROM products p
GROUP BY p.id
ORDER BY view_count DESC;

CREATE UNIQUE INDEX IF NOT EXISTS trending_products_id_idx ON trending_products(id);

-- Enable RLS on materialized view
ALTER MATERIALIZED VIEW trending_products ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for materialized view
CREATE POLICY "Enable read access for all users" ON trending_products
  FOR SELECT USING (true);

-- Function to search products
CREATE OR REPLACE FUNCTION search_products(
  search_query text,
  category_filter text DEFAULT NULL,
  price_min decimal DEFAULT NULL,
  price_max decimal DEFAULT NULL
) RETURNS SETOF products AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM products p
  WHERE 
    (search_query IS NULL OR p.search_vector @@ plainto_tsquery('english', search_query))
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (price_min IS NULL OR p.price >= price_min)
    AND (price_max IS NULL OR p.price <= price_max)
  ORDER BY 
    CASE 
      WHEN search_query IS NOT NULL 
      THEN ts_rank(p.search_vector, plainto_tsquery('english', search_query))
      ELSE 1
    END DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;