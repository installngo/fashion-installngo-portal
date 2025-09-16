create or replace function manage_subcategory(
  p_mode text,
  p_subcategory_id uuid default null,
  p_category_id uuid default null,
  p_subcategory_title text default null
)
returns uuid
language plpgsql
as $$
declare
  v_subcategory_id uuid;
begin
  if p_mode = 'INSERT' then
    insert into subcategories (
      category_id, subcategory_title
    )
    values (
      p_category_id, p_subcategory_title
    )
    returning subcategory_id into v_subcategory_id;

    return v_subcategory_id;

  elsif p_mode = 'UPDATE' then
    update subcategories
    set subcategory_title = coalesce(p_subcategory_title, subcategory_title),
        updated_at        = now()
    where subcategory_id = p_subcategory_id;

    return p_subcategory_id;

  elsif p_mode = 'DELETE' then
    delete from subcategories
    where subcategory_id = p_subcategory_id;

    return p_subcategory_id;

  else
    raise exception 'Invalid mode: %', p_mode;
  end if;
end;
$$;
