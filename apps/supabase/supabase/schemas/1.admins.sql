CREATE TABLE public.admins (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add a GIN index for trigram operations (full text search)
CREATE INDEX admins_trigram_idx 
  ON public.admins 
  USING GIN ((email || ' ' || last_name || ' ' || first_name) gin_trgm_ops);

-- Add indexes to sort by (first and last name) and created_at
CREATE INDEX admins_name_idx 
  ON public.admins 
  (first_name, last_name);

CREATE INDEX admins_created_at_idx 
  ON public.admins 
  (created_at);

-- This will update the `updated_at` column to the current time on every update
CREATE TRIGGER handle_updated_at 
  BEFORE UPDATE ON public.admins 
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (updated_at);

  -- Helper used by RLS policies on moderation-adjacent tables (games, games_users, reports).
-- SECURITY DEFINER + locked search_path so callers can't shadow public.admins.
CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS BOOLEAN
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'ADMIN';
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.is_super_admin()
  RETURNS BOOLEAN
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'SUPER_ADMIN';
$$;

REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, anon;

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "admins_insert_policy"
  ON public.admins 
  FOR INSERT
  TO authenticated
  WITH CHECK ( public.is_super_admin() );

CREATE POLICY "admins_select_policy"
  ON public.admins 
  FOR SELECT
  TO authenticated
  USING ( true );

CREATE POLICY "admins_update_policy" 
  ON public.admins
  FOR UPDATE
  TO authenticated 
  USING ( ((SELECT auth.uid()) = id) OR (SELECT public.is_super_admin()) );

CREATE POLICY "admins_delete_policy"
  ON public.admins
  FOR DELETE
  TO authenticated 
  USING ( (( SELECT auth.uid()) = id) OR ( SELECT public.is_super_admin()) );
  
