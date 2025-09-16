create table subcategories (
  subcategory_id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(category_id) on delete cascade,

  subcategory_title text not null,
  
  created_at timestamptz,
  updated_at timestamptz
);

-- Insert trigger
create trigger trigger_insert_subcategories
before insert on subcategories
for each row
execute function set_insert_date_triggers();

-- Update trigger
create trigger trigger_update_subcategories
before update on subcategories
for each row
execute function set_update_date_triggers();