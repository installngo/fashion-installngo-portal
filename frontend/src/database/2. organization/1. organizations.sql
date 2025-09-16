create table organizations (
  organization_id uuid primary key default gen_random_uuid(),
  organization_code text not null unique,

  full_name text not null,
  email_id text not null unique,
  password_hash text not null,
  
  status_code text not null default 'ACTIVE',

  created_at timestamptz,
  updated_at timestamptz
);

-- Insert trigger
create trigger trigger_insert_organization
before insert on organizations
for each row
execute function set_insert_date_triggers();

-- Update trigger
create trigger trigger_update_organization
before update on organizations
for each row
execute function set_update_date_triggers();