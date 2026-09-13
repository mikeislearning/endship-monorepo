-- Do not delete this file; it is used to set up a cron job to keep the Supabase
-- project from being paused due to inactivity.

-- Enable pg_cron extension (may already be enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

-- Grant usage to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;

-- Create a cron job that runs every 5 days to keep the project active
-- This prevents Supabase free tier projects from being paused due to inactivity
-- Cron expression: '0 0 */5 * *' means "at midnight every 5 days"
SELECT cron.schedule(
  'keep-alive-job',           -- unique job name
  '0 0 */5 * *',              -- cron schedule: every 5 days at midnight UTC
  $$SELECT 1$$                -- simple query to keep the database active
);
