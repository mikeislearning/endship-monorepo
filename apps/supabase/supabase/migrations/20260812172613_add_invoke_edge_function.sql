set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.invoke_edge_function(name text, payload jsonb DEFAULT '{}'::jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'net', 'vault'
AS $function$
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
$function$
;


