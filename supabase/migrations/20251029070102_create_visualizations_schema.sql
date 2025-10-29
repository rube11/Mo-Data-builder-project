-- Create visualizations table
create table if not exists visualizations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  uploaded_image_url text not null,
  chart_type text not null check (chart_type in ('bar', 'line', 'pie', 'scatter', 'histogram')),
  generated_chart_url text default 'https://via.placeholder.com/400x300?text=Chart+Placeholder',
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an index on created_at for faster sorting
create index if not exists visualizations_created_at_idx on visualizations(created_at desc);

-- Enable Row Level Security (RLS)
alter table visualizations enable row level security;

-- Create policy to allow anyone to read visualizations
create policy "Allow public read access"
  on visualizations for select
  using (true);

-- Create policy to allow anyone to insert visualizations
create policy "Allow public insert access"
  on visualizations for insert
  with check (true);

-- Create policy to allow anyone to update visualizations
create policy "Allow public update access"
  on visualizations for update
  using (true);

-- Create policy to allow anyone to delete visualizations
create policy "Allow public delete access"
  on visualizations for delete
  using (true);

-- Create a function to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to call the function before each update
create trigger update_visualizations_updated_at
  before update on visualizations
  for each row
  execute function update_updated_at_column();