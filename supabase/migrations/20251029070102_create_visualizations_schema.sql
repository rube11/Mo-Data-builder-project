-- Create visualizations schema
create table if not exists visualizations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  uploaded_image_url text not null,
  chart_type text not null check (chart_type in ('bar', 'line', 'pie')),
  generated_chart_url text default '/bargraph.jpeg',
  generated_report_url text default '/Generatedreport.pdf',
);


-- Create a function to set the chart placeholder based on chart_type
create or replace function set_chart_placeholder()
returns trigger as $$
begin
  if new.generated_chart_url = '/bargraph.jpeg' then
    case new.chart_type
      when 'bar' then
        new.generated_chart_url := '/bargraph.jpeg';
      when 'line' then
        new.generated_chart_url := '/linegraph.jpg';
      when 'pie' then
        new.generated_chart_url := '/piechart.jpeg';
      else
        new.generated_chart_url := '/bargraph.jpeg';
    end case;
  end if;
  return new;
end;
$$ language plpgsql;

-- Create a trigger to set the appropriate placeholder on insert
create trigger set_chart_placeholder_on_insert
  before insert on visualizations
  for each row
  execute function set_chart_placeholder();

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

