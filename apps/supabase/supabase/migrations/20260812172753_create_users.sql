revoke delete on table "public"."admins" from "anon";

revoke insert on table "public"."admins" from "anon";

revoke select on table "public"."admins" from "anon";

revoke update on table "public"."admins" from "anon";

revoke delete on table "public"."admins" from "authenticated";

revoke insert on table "public"."admins" from "authenticated";

revoke select on table "public"."admins" from "authenticated";

revoke update on table "public"."admins" from "authenticated";

revoke delete on table "public"."admins" from "service_role";

revoke insert on table "public"."admins" from "service_role";

revoke select on table "public"."admins" from "service_role";

revoke update on table "public"."admins" from "service_role";


  create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."users" enable row level security;

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE INDEX users_name_idx ON public.users USING btree (first_name, last_name);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE INDEX users_trigram_idx ON public.users USING gin ((((((email || ' '::text) || last_name) || ' '::text) || first_name)) gin_trgm_ops);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_from_auth()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$
;

grant references on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant references on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant references on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";


  create policy "users_delete_policy"
  on "public"."users"
  as permissive
  for delete
  to authenticated
using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT public.is_admin() AS is_admin)));



  create policy "users_select_policy"
  on "public"."users"
  as permissive
  for select
  to authenticated
using (true);



  create policy "users_update_policy"
  on "public"."users"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER create_user_from_auth AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_from_auth();


