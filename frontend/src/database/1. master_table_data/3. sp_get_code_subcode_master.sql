create or replace function sp_get_code_subcode_master(p_code_type text)
returns jsonb
language sql
as $$
  select jsonb_agg(
    jsonb_build_object(
      'code_master_id', cm.code_master_id,
      'code_type', cm.code_type,
      'code_code', cm.code_code,
      'display_name', cm.display_name,
      'is_default', cm.is_default,
      'display_sequence', cm.display_sequence,
      'sub_codes', coalesce(
        (
          select jsonb_agg(
            jsonb_build_object(
              'sub_code_master_id', scm.sub_code_master_id,
              'code_code', scm.code_code,
              'display_name', scm.display_name,
              'is_default', scm.is_default,
              'display_sequence', scm.display_sequence
            ) order by scm.display_sequence
          )
          from sub_code_master scm
          where scm.code_master_id = cm.code_master_id
        ), '[]'::jsonb
      )
    )
    order by cm.display_sequence
  )
  from code_master cm
  where cm.code_type = p_code_type;
$$;