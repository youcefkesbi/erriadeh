create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  graduation_year integer not null,
  phone text not null,
  status text DEFAULT 'pending';
  created_at timestamp with time zone default now()
);