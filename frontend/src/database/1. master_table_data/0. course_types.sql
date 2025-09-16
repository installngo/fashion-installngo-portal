create table course_types (
  course_type_id uuid primary key default gen_random_uuid(),

  type_code text not null,
  type_name text not null,

  display_sequence int not null default 0,
  
  created_at timestamptz,
  updated_at timestamptz
);

--Insert trigger
create trigger trigger_insert_course_types
before insert on course_types
for each row
execute function set_insert_date_triggers();

--Update trigger
create trigger trigger_update_course_types
before update on course_types
for each row
execute function set_update_date_triggers();

--Master data
insert into course_types (type_code, type_name, display_sequence)
                  select 'FREE', 'Free Course', 1
                  union
                  select 'PAID', 'Paid Course', 2