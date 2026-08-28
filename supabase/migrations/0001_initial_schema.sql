create extension if not exists "pgcrypto";

create type public.user_role as enum ('student', 'jh', 'cf');
create type public.source_type as enum ('official', 'cf', 'jh');
create type public.onboarding_category as enum ('before_classes', 'first_week', 'first_month', 'during_semester');
create type public.checklist_status as enum ('completed', 'pending', 'scheduled');
create type public.content_status as enum ('draft', 'published', 'scheduled');
create type public.announcement_target_type as enum ('all', 'faculty', 'group');

create table public.faculties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  letter text not null
);

create table public.semesters (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  start_date date not null,
  end_date date not null,
  active boolean not null default false
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role public.user_role not null,
  faculty_id uuid references public.faculties(id),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  faculty_id uuid not null references public.faculties(id),
  jh_id uuid references public.profiles(id),
  semester_id uuid not null references public.semesters(id),
  unique (name, semester_id)
);

create table public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, student_id)
);

create table public.onboarding_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category public.onboarding_category not null,
  sort_order integer not null,
  available_from date,
  source_type public.source_type not null,
  official boolean not null default false,
  active boolean not null default true
);

create table public.student_onboarding (
  student_id uuid not null references public.profiles(id) on delete cascade,
  step_id uuid not null references public.onboarding_steps(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  primary key (student_id, step_id)
);

create table public.jh_checklist (
  id uuid primary key default gen_random_uuid(),
  jh_id uuid not null references public.profiles(id) on delete cascade,
  step_id uuid not null references public.onboarding_steps(id),
  status public.checklist_status not null default 'pending',
  completed_at timestamptz
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.announcement_target_type not null,
  target_id uuid,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  semester_id uuid not null references public.semesters(id),
  first_cycle boolean not null default false
);

create table public.assessment_schemes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  name text not null
);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.assessment_schemes(id) on delete cascade,
  name text not null,
  short_name text not null,
  weight numeric(5,2) not null check (weight >= 0 and weight <= 100),
  sort_order integer not null
);

create table public.student_grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  grade numeric(4,2) not null check (grade >= 0 and grade <= 20),
  unique (student_id, assessment_id)
);

create table public.campus_places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  faculty_id uuid references public.faculties(id),
  building_code text,
  latitude numeric(10,7) not null,
  longitude numeric(10,7) not null,
  description text
);

create table public.content_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  body text not null,
  source_type public.source_type not null,
  author_id uuid references public.profiles(id),
  faculty_id uuid references public.faculties(id),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);
create index profiles_faculty_idx on public.profiles(faculty_id);
create index groups_jh_idx on public.groups(jh_id);
create index group_members_student_idx on public.group_members(student_id);
create index onboarding_steps_active_idx on public.onboarding_steps(active, sort_order);
create index announcements_target_idx on public.announcements(target_type, target_id);
create index content_resources_status_idx on public.content_resources(status, faculty_id);

alter table public.profiles enable row level security;
alter table public.faculties enable row level security;
alter table public.semesters enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.onboarding_steps enable row level security;
alter table public.student_onboarding enable row level security;
alter table public.jh_checklist enable row level security;
alter table public.announcements enable row level security;
alter table public.courses enable row level security;
alter table public.assessment_schemes enable row level security;
alter table public.assessments enable row level security;
alter table public.student_grades enable row level security;
alter table public.campus_places enable row level security;
alter table public.content_resources enable row level security;

create or replace function public.current_role()
returns public.user_role
language sql
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "profiles own select" on public.profiles
  for select using (
    id = auth.uid()
    or public.current_role() in ('jh', 'cf')
  );

create policy "profiles own update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "public reference read faculties" on public.faculties for select using (true);
create policy "public reference read semesters" on public.semesters for select using (true);
create policy "public onboarding read" on public.onboarding_steps for select using (active = true);
create policy "public courses read" on public.courses for select using (true);
create policy "public schemes read" on public.assessment_schemes for select using (true);
create policy "public assessments read" on public.assessments for select using (true);
create policy "public campus read" on public.campus_places for select using (true);

create policy "students manage own onboarding" on public.student_onboarding
  for all using (student_id = auth.uid()) with check (student_id = auth.uid());

create policy "students manage own grades" on public.student_grades
  for all using (student_id = auth.uid()) with check (student_id = auth.uid());

create policy "students see own group membership" on public.group_members
  for select using (
    student_id = auth.uid()
    or exists (
      select 1 from public.groups g
      where g.id = group_members.group_id and g.jh_id = auth.uid()
    )
    or public.current_role() = 'cf'
  );

create policy "groups visible by membership" on public.groups
  for select using (
    jh_id = auth.uid()
    or exists (
      select 1 from public.group_members gm
      where gm.group_id = groups.id and gm.student_id = auth.uid()
    )
    or public.current_role() = 'cf'
  );

create policy "jh manage own checklist" on public.jh_checklist
  for all using (jh_id = auth.uid()) with check (jh_id = auth.uid());

create policy "announcements scoped read" on public.announcements
  for select using (
    target_type = 'all'
    or author_id = auth.uid()
    or public.current_role() = 'cf'
  );

create policy "jh and cf create announcements" on public.announcements
  for insert with check (public.current_role() in ('jh', 'cf') and author_id = auth.uid());

create policy "content read published" on public.content_resources
  for select using (status = 'published' or author_id = auth.uid() or public.current_role() = 'cf');

create policy "cf manage faculty content" on public.content_resources
  for all using (
    public.current_role() = 'cf'
    and faculty_id = (select faculty_id from public.profiles where id = auth.uid())
  )
  with check (
    public.current_role() = 'cf'
    and faculty_id = (select faculty_id from public.profiles where id = auth.uid())
  );
