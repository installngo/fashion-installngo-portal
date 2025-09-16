create or replace function manage_category(
  p_mode text,
  p_category_id uuid default null,
  p_org_id uuid default null,
  p_category_title text default null
)
returns uuid
language plpgsql
as $$
declare
  v_category_id uuid;
begin
  if p_mode = 'INSERT' then
    insert into categories (
      organization_id, category_title
    )
    values (
      p_org_id, p_category_title
    )
    returning category_id into v_category_id;

    return v_category_id;

  elsif p_mode = 'UPDATE' then
    update categories
    set category_title = coalesce(p_category_title, category_title),
        updated_at     = now()
    where category_id = p_category_id;

    return p_category_id;

  elsif p_mode = 'DELETE' then
    delete from categories
    where category_id = p_category_id;

    return p_category_id;

  else
    raise exception 'Invalid mode: %', p_mode;
  end if;
end;
$$;
