create or replace view v_courses as
select 
  c.course_id,
  c.organization_id,
  c.course_title,
  c.course_description,
  c.thumbnail_url,
  c.price,
  c.discount_price,
  c.effective_price,
  c.status_code,
  ct.type_name,
  cd.duration_name,
  cat.category_title,
  sub.subcategory_title,
  c.created_at,
  c.updated_at
from courses c
left join categories cat on c.category_id = cat.category_id
left join subcategories sub on c.subcategory_id = sub.subcategory_id
left join course_types ct on c.course_type_code = ct.type_code
left join course_durations cd on c.course_duration_code = cd.duration_code;
