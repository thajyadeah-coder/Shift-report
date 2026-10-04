-- À exécuter une seule fois dans Supabase : Dashboard > SQL Editor > New query > coller > Run
create table if not exists public.mobile_money (
  user_id uuid primary key references auth.users(id) on delete cascade,
  operator text not null default '',
  number text not null default '',
  holder text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.mobile_money enable row level security;

-- Fonction "security definer" pour vérifier le rôle admin sans boucle RLS sur profiles
create or replace function public.mm_is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "mm_select" on public.mobile_money;
drop policy if exists "mm_insert" on public.mobile_money;
drop policy if exists "mm_update" on public.mobile_money;

create policy "mm_select" on public.mobile_money for select to authenticated
  using (user_id = auth.uid() or public.mm_is_admin());
create policy "mm_insert" on public.mobile_money for insert to authenticated
  with check (user_id = auth.uid() or public.mm_is_admin());
create policy "mm_update" on public.mobile_money for update to authenticated
  using (user_id = auth.uid() or public.mm_is_admin())
  with check (user_id = auth.uid() or public.mm_is_admin());

notify pgrst, 'reload schema';
