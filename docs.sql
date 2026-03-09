create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  graduation_year integer not null,
  phone text not null,
  role text default 'student', -- or 'admin'
  status text default 'pending',
  transcript_url text not null,
  created_at timestamp with time zone default now()
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

CREATE POLICY "users_can_update_own_profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_profile"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "users_can_select_own_profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "admins_can_select_profiles"
ON profiles
FOR SELECT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');