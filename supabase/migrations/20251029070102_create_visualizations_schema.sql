
-- Create the table without timestamp columns
create table if not exists visualizations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  uploaded_image_url text not null,
  chart_type text not null check (chart_type in ('bar', 'line', 'pie')),
  generated_chart_url text default 'https://via.placeholder.com/400x300?text=Chart+Placeholder',
  description text
);

-- Enable RLS
alter table visualizations enable row level security;

-- Create policies
create policy "Allow public read access" on visualizations for select using (true);
create policy "Allow public insert access" on visualizations for insert with check (true);
create policy "Allow public update access" on visualizations for update using (true);
create policy "Allow public delete access" on visualizations for delete using (true);

-- Allow anyone to upload files to excel-files bucket
create policy "Allow public uploads to excel-files"
on storage.objects for insert
with check (bucket_id = 'excel-files');

-- Allow anyone to read files from excel-files bucket
create policy "Allow public reads from excel-files"
on storage.objects for select
using (bucket_id = 'excel-files');

-- (Optional) Allow updates and deletes
create policy "Allow public updates to excel-files"
on storage.objects for update
using (bucket_id = 'excel-files');

create policy "Allow public deletes from excel-files"
on storage.objects for delete
using (bucket_id = 'excel-files');