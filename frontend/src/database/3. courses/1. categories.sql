create table categories (
  category_id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(organization_id) on delete cascade,

  category_title text not null,

  created_at timestamptz,
  updated_at timestamptz
);

-- Insert trigger
create trigger trigger_insert_category
before insert on categories
for each row
execute function set_insert_date_triggers();

-- Update trigger
create trigger trigger_update_category
before update on categories
for each row
execute function set_update_date_triggers();