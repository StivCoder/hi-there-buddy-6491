create or replace function public.link_parent_account()
returns setof public.parents
language plpgsql security definer set search_path = public
as $$
declare v_email text := lower(auth.jwt() ->> 'email');
begin
  if auth.uid() is null or v_email is null then return; end if;
  update public.parents set user_id = auth.uid()
   where user_id is null and lower(email) = v_email;
  return query select * from public.parents where user_id = auth.uid() limit 1;
end; $$;
revoke all on function public.link_parent_account() from public, anon;
grant execute on function public.link_parent_account() to authenticated;