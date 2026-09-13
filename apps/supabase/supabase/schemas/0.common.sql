-- Add the pg_trgm extension
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA pg_catalog;

-- Enable MODDATETIME extension
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA pg_catalog;

-- Enable pg_cron extension (may already be enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

-- Grant usage to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;

-- Enable pg_net extension for HTTP requests from Postgres
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a cron job that runs every 5 days to keep the project active
-- This prevents Supabase free tier projects from being paused due to inactivity
-- Cron expression: '0 0 */5 * *' means "at midnight every 5 days"
SELECT cron.schedule(
  'keep-alive-job',           -- unique job name
  '0 0 */5 * *',              -- cron schedule: every 5 days at midnight UTC
  $$SELECT 1$$                -- simple query to keep the database active
);

-- Enable pg_net so Postgres can make outbound HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Shared helper: enqueue an asynchronous POST to a Supabase Edge Function via
-- pg_net. Used by triggers / cron jobs that need to hand work off to an edge
-- function (notification creation, system chat messages, reminders, etc.)
-- instead of doing business logic in plpgsql.
--
-- Reads three named secrets from Supabase Vault:
--   * vault.decrypted_secrets.name = 'sb_url'              → project base URL
--   * vault.decrypted_secrets.name = 'sb_publishable_key'  → publishable API key
--   * vault.decrypted_secrets.name = 'sb_secret_key'       → secret API key
--
-- The two API keys serve distinct purposes on the request:
--   * `Authorization: Bearer <publishable_key>` — just satisfies the Edge
--     Runtime's API-key gate. Publishable keys have no elevated privileges
--     (they're the rebrand of `anon`), so they're the correct choice here:
--     if the header ever leaked it wouldn't hand out service-role access.
--   * `x-function-secret: <secret_key>` — the real app-level auth, checked
--     by the requireFunctionSecret middleware (see _shared/middleware/
--     authentication.ts). Only pg_net → edge function traffic has this,
--     so the middleware can trust the request came from Postgres.
--
-- Locally these are provisioned via `[db.vault]` in supabase/config.toml,
-- which resolves each value from an env var (VAULT_SB_URL,
-- VAULT_SB_PUBLISHABLE_KEY, VAULT_SB_SECRET_KEY) so committed local values
-- never overwrite deployed secrets. Local values live in .env.development.local;
-- deployed values live in the encrypted .env.<environment> files.
-- See apps/supabase/README.md.
--
-- Returns the pg_net request id so callers can correlate with
-- net.http_response for debugging.
--
-- SECURITY DEFINER + locked search_path so RLS-restricted callers (triggers
-- running as the invoking user) can still read vault + call net.http_post,
-- and so search_path attacks can't reroute the vault lookup.
CREATE OR REPLACE FUNCTION public.invoke_edge_function(
  name TEXT,
  payload JSONB DEFAULT '{}'::jsonb
)
  RETURNS BIGINT
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public, net, vault
AS $$
DECLARE
  v_base_url TEXT;
  v_publishable_key TEXT;
  v_secret_key TEXT;
  v_request_id BIGINT;
BEGIN
  SELECT decrypted_secret INTO v_base_url
    FROM vault.decrypted_secrets
    WHERE decrypted_secrets.name = 'sb_url'
    LIMIT 1;

  SELECT decrypted_secret INTO v_publishable_key
    FROM vault.decrypted_secrets
    WHERE decrypted_secrets.name = 'sb_publishable_key'
    LIMIT 1;

  SELECT decrypted_secret INTO v_secret_key
    FROM vault.decrypted_secrets
    WHERE decrypted_secrets.name = 'sb_secret_key'
    LIMIT 1;

  IF v_base_url IS NULL OR v_publishable_key IS NULL OR v_secret_key IS NULL THEN
    RAISE EXCEPTION
      'invoke_edge_function: missing vault secrets sb_url, sb_publishable_key and/or sb_secret_key';
  END IF;

  SELECT net.http_post(
    url := v_base_url || '/functions/v1/' || name,
    body := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_publishable_key,
      'x-function-secret', v_secret_key
    ),
    timeout_milliseconds := 30000
  ) INTO v_request_id;

  RETURN v_request_id;
END;
$$;

REVOKE ALL ON FUNCTION public.invoke_edge_function(TEXT, JSONB) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.invoke_edge_function(TEXT, JSONB) TO postgres;

