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
  image_url text,
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

-- RLS fix: avoid recursive policy. (SELECT role FROM profiles ...) triggers RLS on profiles again → 500.
-- Use a SECURITY DEFINER function so the role check does not go through RLS.
CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$;

CREATE POLICY "admins_can_select_profiles"
ON profiles
FOR SELECT
USING (public.current_user_is_admin());

-- Storage bucket "Transcript": allow authenticated users to upload to their own folder.
-- Path format used by app: {user_id}/{user_id}.{ext} so first path segment = auth.uid().
-- In Supabase Dashboard: Storage → Transcript → Policies → New policy.
-- For INSERT: (bucket_id = 'Transcript') AND ((storage.foldername(name))[1] = auth.uid()::text)
-- For SELECT (public read): (bucket_id = 'Transcript') if bucket is public, or same folder check for private.

-- Allow users to insert/upload their own file
CREATE POLICY "users_can_upload_own_file"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'Transcript' AND
  auth.uid() = (split_part(name, '/', 1))::uuid
);

CREATE POLICY "users_can_read_own_file"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'Transcript' AND
  auth.uid() = (split_part(name, '/', 1))::uuid
);

-- Admin SELECT (see all files)
CREATE POLICY "admins_can_read_files"
ON storage.objects
FOR SELECT
USING (
  public.current_user_is_admin()
);


CREATE POLICY "Public can view announcements"
ON announcements
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert announcements"
ON announcements
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update announcements"
ON announcements
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete announcements"
ON announcements
FOR DELETE
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
  )
);

CREATE POLICY "Authenticated users can upload announcement images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'announcements');

CREATE POLICY "Public can view announcement images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'announcements');