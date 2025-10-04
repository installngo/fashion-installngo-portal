create table code_master (
  code_master_id uuid primary key default gen_random_uuid(),

  code_type text not null,
  code_code text not null,

  display_name text not null,

  is_default boolean,
  display_sequence int not null default 0,

  created_at timestamptz,
  updated_at timestamptz
);

--Insert trigger
create trigger trigger_insert_code_master
before insert on code_master
for each row
execute function set_insert_date_triggers();

--Update trigger
create trigger trigger_update_code_master
before update on code_master
for each row
execute function set_update_date_triggers();

--Master data
insert into code_master (code_type, code_code, display_name, is_default, display_sequence)
                  select 'FASHIONCATEGORY', 'SALWAR', 'Salwar', true, 1
                  union
                  select 'FASHIONCATEGORY', 'KURTHI', 'Kurthi', false, 2

insert into code_master (code_type, code_code, display_name, is_default, display_sequence)
                  select 'COURSEVALIDITY', 'ONEMONTH', '1 Month', false, 0
                  union
                  select 'COURSEVALIDITY', 'THREEMONTH', '3 Months', true, 1
                  union
                  select 'COURSEVALIDITY', 'SIXMONTH', '6 Months', false, 2
                  union
                  select 'COURSEVALIDITY', 'YEAR', '1 Year', false, 3