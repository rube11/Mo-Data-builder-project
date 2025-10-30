-- Create visualizations schema
create table if not exists visualizations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  uploaded_image_url text not null,
  chart_type text not null check (chart_type in ('bar', 'line', 'pie')),
  generated_chart_url text default 'example_chart.png',
  generated_report_url text default 'example.pdf',
  description text
);

-- Enable RLS
alter table visualizations enable row level security;

-- Create policies
create policy "Allow public read access" on visualizations for select using (true);
create policy "Allow public insert access" on visualizations for insert with check (true);
create policy "Allow public update access" on visualizations for update using (true);
create policy "Allow public delete access" on visualizations for delete using (true);