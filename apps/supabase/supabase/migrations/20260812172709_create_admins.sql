create extension if not exists "moddatetime" with schema "pg_catalog";

create extension if not exists "pg_trgm" with schema "pg_catalog";

create extension if not exists "pg_net" with schema "extensions";


  create table "public"."admins" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "is_super_admin" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."admins" enable row level security;

CREATE INDEX admins_created_at_idx ON public.admins USING btree (created_at);

CREATE UNIQUE INDEX admins_email_key ON public.admins USING btree (email);

CREATE INDEX admins_name_idx ON public.admins USING btree (first_name, last_name);

CREATE UNIQUE INDEX admins_pkey ON public.admins USING btree (id);

CREATE INDEX admins_trigram_idx ON public.admins USING gin ((((((email || ' '::text) || last_name) || ' '::text) || first_name)) gin_trgm_ops);

alter table "public"."admins" add constraint "admins_pkey" PRIMARY KEY using index "admins_pkey";

alter table "public"."admins" add constraint "admins_email_key" UNIQUE using index "admins_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'ADMIN';
$function$
;

CREATE OR REPLACE FUNCTION public.is_super_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'SUPER_ADMIN';
$function$
;

grant references on table "public"."admins" to "anon";

grant trigger on table "public"."admins" to "anon";

grant truncate on table "public"."admins" to "anon";

grant references on table "public"."admins" to "authenticated";

grant trigger on table "public"."admins" to "authenticated";

grant truncate on table "public"."admins" to "authenticated";

grant references on table "public"."admins" to "service_role";

grant trigger on table "public"."admins" to "service_role";

grant truncate on table "public"."admins" to "service_role";


  create policy "admins_delete_policy"
  on "public"."admins"
  as permissive
  for delete
  to authenticated
using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT public.is_super_admin() AS is_super_admin)));



  create policy "admins_insert_policy"
  on "public"."admins"
  as permissive
  for insert
  to authenticated
with check (public.is_super_admin());



  create policy "admins_select_policy"
  on "public"."admins"
  as permissive
  for select
  to authenticated
using (true);



  create policy "admins_update_policy"
  on "public"."admins"
  as permissive
  for update
  to authenticated
using (((SELECT auth.uid()) = id) OR (SELECT public.is_super_admin()));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


