create table courses (
  course_id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(organization_id) on delete cascade,
  
  course_title text not null,
  course_description text,
  thumbnail_url text,

  category_id uuid references categories(category_id) on delete set null,
  subcategory_id uuid references subcategories(subcategory_id) on delete set null,
  
  course_type_code text not null,
  course_duration_code text not null,
    
  price numeric(10,2) not null default 0,
  discount_price numeric(10,2) not null default 0,
  effective_price numeric(10,2) not null default 0,
  status_code text check (status_code in ('DRAFT', 'ACTIVE', 'SUSPENDED')) default 'DRAFT',

  created_at timestamptz,
  updated_at timestamptz
);

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