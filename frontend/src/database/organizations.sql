create table organizations (
  organization_id uuid primary key default gen_random_uuid(),
  code text not null unique,
  full_name text not null,
  email_id text not null unique,
  password_hash text not null,
  status_code text not null,
  created_at timestamp,
  updated_at timestamp
);

-- Insert function
create or replace function set_insert_triggers()
returns trigger as $$
begin
  new.status_code := 'ACTIVE';
  new.created_at := now();
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

-- Insert trigger
create trigger trigger_insert_organization
before insert on organizations
for each row
execute function set_insert_triggers();

-- Update function
create or replace function set_update_triggers()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

-- Update trigger
create trigger trigger_update_organization
before update on organizations
for each row
execute function set_update_triggers();