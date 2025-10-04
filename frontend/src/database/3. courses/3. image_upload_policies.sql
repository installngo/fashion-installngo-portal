-- Allow anon users to insert/upload thumbnails
create policy "Allow anon users to upload thumbnails"
on storage.objects
for insert
to anon
with check (bucket_id = 'fashion-course-thumbnails');

-- Allow anon users to update / overwrite thumbnails
create policy "Allow anon users to update thumbnails"
on storage.objects
for update
to anon
using (bucket_id = 'fashion-course-thumbnails')
with check (bucket_id = 'fashion-course-thumbnails');

-- Allow anon users to delete thumbnails
create policy "Allow anon users to delete thumbnails"
on storage.objects
for delete
to anon
using (bucket_id = 'fashion-course-thumbnails');

-- Allow anon users to read thumbnails
create policy "Allow anon users to read thumbnails"
on storage.objects
for select
to anon
using (bucket_id = 'fashion-course-thumbnails');