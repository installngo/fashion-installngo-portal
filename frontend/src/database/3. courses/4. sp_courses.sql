create or replace function manage_course(
  p_mode text,
  p_course_id uuid default null,
  p_org_id uuid default null,
  p_course_title text default null,
  p_course_description text default null,
  p_thumbnail_url text default null,
  p_category_id uuid default null,
  p_subcategory_id uuid default null,
  p_course_type_code text default null,
  p_course_duration_code text default null,
  p_price numeric default 0,
  p_discount_price numeric default 0
)
returns uuid
language plpgsql
as $$
declare
  v_course_id uuid;
begin
  if p_mode = 'INSERT' then
    insert into courses (
      organization_id, course_title, course_description, thumbnail_url,
      category_id, subcategory_id,
      course_type_code, course_duration_code,
      price, discount_price, effective_price
    )
    values (
      p_org_id, p_course_title, p_course_description, p_thumbnail_url,
      p_category_id, p_subcategory_id,
      p_course_type_code, p_course_duration_code,
      p_price, p_discount_price, p_price - p_discount_price
    )
    returning course_id into v_course_id;

    return v_course_id;

  elsif p_mode = 'UPDATE' then
    update courses
    set course_title        = coalesce(p_course_title, course_title),
        course_description  = coalesce(p_course_description, course_description),
        thumbnail_url       = coalesce(p_thumbnail_url, thumbnail_url),
        category_id         = coalesce(p_category_id, category_id),
        subcategory_id      = coalesce(p_subcategory_id, subcategory_id),
        course_type_code    = coalesce(p_course_type_code, course_type_code),
        course_duration_code= coalesce(p_course_duration_code, course_duration_code),
        price               = coalesce(p_price, price),
        discount_price      = coalesce(p_discount_price, discount_price),
        effective_price     = coalesce(p_price - p_discount_price, effective_price),
        updated_at          = now()
    where course_id = p_course_id;

    return p_course_id;

  elsif p_mode = 'SUSPEND' then
    update courses
    set status_code = 'SUSPENDED',
        updated_at = now()
    where course_id = p_course_id;

    return p_course_id;

  elsif p_mode = 'DELETE' then
    delete from courses
    where course_id = p_course_id;

    return p_course_id;

  else
    raise exception 'Invalid mode: %', p_mode;
  end if;
end;
$$;
