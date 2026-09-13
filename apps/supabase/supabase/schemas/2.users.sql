CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add a GIN index for trigram operations (full text search)
CREATE INDEX users_trigram_idx 
  ON public.users 
  USING GIN ((email || ' ' || last_name || ' ' || first_name) gin_trgm_ops);

-- Add indexes to sort by (first and last name) and created_at
CREATE INDEX users_name_idx 
  ON public.users 
  (first_name, last_name);

CREATE INDEX users_created_at_idx 
  ON public.users 
  (created_at);

-- This will update the `updated_at` column to the current time on every update
CREATE TRIGGER handle_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (updated_at);

-- DB function to create a user from the auth.users table
-- Notes:
--   * The defensive `NOT EXISTS` check covers both the (id) PK and the
--     (email) UNIQUE constraint, so the trigger plays nicely with seeds /
--     migrations that explicitly insert their own `public.users` rows after
--     creating the matching `auth.users` row.
CREATE OR REPLACE FUNCTION public.create_user_from_auth()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT := COALESCE(new.raw_app_meta_data ->> 'role', 'USER');
BEGIN
  -- Admins live in `public.admins`, not `public.users`, so they are provisioned
  -- separately (seeds / admin provisioning flows) rather than by this trigger.
  IF v_role NOT IN ('ADMIN', 'SUPER_ADMIN') AND NOT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = NEW.id OR email = NEW.email
  ) THEN
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
      new.id,
      new.email,
      split_part(COALESCE(new.raw_user_meta_data ->> 'name', ''), ' ', 1),
      split_part(COALESCE(new.raw_user_meta_data ->> 'name', ''), ' ', 2)
    );
  END IF;

  -- Default the JWT `app_metadata.role` claim to 'USER' when not already set,
  -- so role-based gating on the client (and `auth.jwt()` checks in RLS) work
  -- on the first session returned by `verifyOtp`. `v_role` already falls back
  -- to 'USER', so any role pre-set by seeds or admin provisioning flows is
  -- preserved as-is.
  UPDATE auth.users
  SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb)
    || jsonb_build_object('role', v_role)
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

-- Trigger to execute the above function when an auth.user is created
CREATE OR REPLACE TRIGGER create_user_from_auth
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_from_auth();


-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "users_select_policy"
  ON public.users 
  FOR SELECT
  TO authenticated
  USING ( true );

CREATE POLICY "users_update_policy" 
  ON public.users
  FOR UPDATE
  TO authenticated 
  USING ( (( SELECT auth.uid()) = id) );

CREATE POLICY "users_delete_policy" 
  ON public.users
  FOR DELETE
  TO authenticated 
  USING ( (( SELECT auth.uid()) = id) OR ( SELECT public.is_admin() ) );
