-- Insert function
create or replace function set_insert_date_triggers()
returns trigger as $$
begin
  new.created_at := now();
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

-- Update function
create or replace function set_update_date_triggers()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;