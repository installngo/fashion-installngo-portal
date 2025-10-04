--Table
create table if not exists sub_code_master (
  sub_code_master_id uuid primary key default gen_random_uuid(),
  code_master_id uuid references code_master(code_master_id) on delete cascade,  
  
  code_code text not null,

  display_name text not null,

  is_default boolean,
  display_sequence int not null default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

--Insert Trigger
create trigger trigger_insert_sub_code_master
before insert on sub_code_master
for each row
execute function set_insert_date_triggers();

--Update Trigger
create trigger trigger_update_sub_code_master
before update on sub_code_master
for each row
execute function set_update_date_triggers();

--Master Data for course type "SALWAR"
insert into sub_code_master (code_master_id, code_code, display_name, is_default, display_sequence)
                      select code_master_id, 'ALL', 'All', true, 1
                      from code_master 
                      where code_type = 'FASHIONCATEGORY'
                      and code_code = 'SALWAR'

--Master Data for course type "PAID"
insert into sub_code_master (code_master_id, code_code, display_name, is_default, display_sequence)
                      select code_master_id, 'ALL', 'All', true, 1
                      from code_master 
                      where code_type = 'FASHIONCATEGORY'
                      and code_code = 'KURTHI'
                      union All
                      select code_master_id, 'ALINEKURTHI', 'A-Line Kurti', false, 2
                      from code_master 
                      where code_type = 'FASHIONCATEGORY'
                      and code_code = 'KURTHI'