--Table
create table if not exists course_durations (
  course_duration_id uuid primary key default gen_random_uuid(),
  course_type_id uuid references course_types(course_type_id) on delete cascade,  
  
  duration_code text not null,
  duration_name text not null,

  display_sequence int not null default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

--Insert Trigger
create trigger trigger_insert_course_durations
before insert on course_durations
for each row
execute function set_insert_date_triggers();

--Update Trigger
create trigger trigger_update_course_durations
before update on course_durations
for each row
execute function set_update_date_triggers();

--Master Data for course type "FREE"
insert into course_durations (course_type_id, duration_code, duration_name, display_sequence)
                      select course_type_id, 'COURSEEXPIRY', 'Course Expiry Date', 1
                      from course_types where type_code = 'FREE'
                      union all
                      select course_type_id, 'SINGLE', 'Single Validity', 2
                      from course_types where type_code = 'FREE';

--Master Data for course type "PAID"
insert into course_durations (course_type_id, duration_code, duration_name, display_sequence)
                      select course_type_id, 'COURSEEXPIRY', 'Course Expiry Date', 1
                      from course_types where type_code = 'PAID'
                      union all
                      select course_type_id, 'SINGLE', 'Single Validity', 2
                      from course_types where type_code = 'PAID'
                      union all
                      select course_type_id, 'LIFETIME', 'Lifetime Validity', 3
                      from course_types where type_code = 'PAID';
