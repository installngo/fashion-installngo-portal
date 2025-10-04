-- Main Courses table
create table courses (
  course_id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(organization_id) on delete cascade,

  course_title text not null,
  course_description text,
  thumbnail_url text,

  category_code text not null,
  sub_category_code text,
  course_type text not null,
  validity_code text not null,

  original_price numeric(10,2),
  discount_price numeric(10,2),
  effective_price numeric(10,2),

  status_code text default 'ACTIVE',

  created_at timestamptz,
  updated_at timestamptz
);

-- Indexes for quick lookup
create index idx_courses_org on courses (organization_id);
create index idx_courses_category on courses (category_code);

-- Insert trigger
create trigger trigger_insert_course
before insert on courses
for each row
execute function set_insert_date_triggers();

-- Update trigger
create trigger trigger_update_course
before update on courses
for each row
execute function set_update_date_triggers();