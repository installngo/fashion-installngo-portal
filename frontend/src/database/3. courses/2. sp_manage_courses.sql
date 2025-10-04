create or replace function sp_manage_courses(
  p_action text,
  p_course_id uuid default null,
  p_organization_id uuid default null,

  p_course_title text default null,
  p_course_description text default null,
  p_thumbnail_url text default null,

  p_category_code text default null,
  p_sub_category_code text default null,
  p_course_type text default null,
  p_validity_code text default null,

  p_original_price numeric default null,
  p_discount_price numeric default null,
  p_effective_price numeric default null,

  p_status_code text default null
)
returns json
language plpgsql
as $$
declare
  result json;
begin
  -- INSERT
  if p_action = 'insert' then
    insert into courses (
      organization_id,
      course_title,
      course_description,
      thumbnail_url,
      category_code,
      sub_category_code,
      course_type,
      validity_code,
      original_price,
      discount_price,
      effective_price,
      status_code
    )
    values (
      p_organization_id,
      p_course_title,
      p_course_description,
      p_thumbnail_url,
      p_category_code,
      p_sub_category_code,
      p_course_type,
      p_validity_code,
      p_original_price,
      p_discount_price,
      p_effective_price,
      coalesce(p_status_code, 'ACTIVE')
    )
    returning json_build_object(
      'course_id', course_id,
      'message', 'Course inserted successfully'
    )
    into result;

    return result;

  -- UPDATE
  elsif p_action = 'update' then
    update courses
    set course_title = coalesce(p_course_title, course_title),
        course_description = coalesce(p_course_description, course_description),
        thumbnail_url = coalesce(p_thumbnail_url, thumbnail_url),
        category_code = coalesce(p_category_code, category_code),
        sub_category_code = coalesce(p_sub_category_code, sub_category_code),
        course_type = coalesce(p_course_type, course_type),
        validity_code = coalesce(p_validity_code, validity_code),
        original_price = coalesce(p_original_price, original_price),
        discount_price = coalesce(p_discount_price, discount_price),
        effective_price = coalesce(p_effective_price, effective_price),
        status_code = coalesce(p_status_code, status_code)
    where course_id = p_course_id
    returning json_build_object(
      'course_id', course_id,
      'message', 'Course updated successfully'
    )
    into result;

    return result;

  -- DELETE
  elsif p_action = 'delete' then
    delete from courses
    where course_id = p_course_id
    returning json_build_object(
      'course_id', p_course_id,
      'message', 'Course deleted successfully'
    )
    into result;

    return result;

  -- GET ALL (for organization)
  elsif p_action = 'get_all' then
    return (
      select json_agg(row_to_json(c))
      from (
        select *
        from courses
        where organization_id = p_organization_id
        order by created_at desc
      ) c
    );

  -- GET ONE
  elsif p_action = 'get_one' then
    return (
      select row_to_json(c)
      from courses c
      where c.course_id = p_course_id
    );

  else
    return json_build_object('error', 'Invalid action provided');
  end if;
end;
$$;