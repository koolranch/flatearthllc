-- Run this file in Supabase SQL editor
create table brand    (id serial primary key, name text unique);
create table system   (id serial primary key, name text unique);
create table category (id serial primary key, name text unique);
create table city     (id serial primary key, name text, state text);

create table part (
  id serial primary key,
  sku text unique,
  name text,
  description text,
  price numeric,
  brand_id int references brand(id),
  system_id int references system(id),
  category_id int references category(id),
  slug text unique
);

create table rental (
  id serial primary key,
  name text,
  description text,
  category_id int references category(id),
  city_id int references city(id),
  slug text unique
);

create table vendor (
  id serial primary key,
  name text unique,
  website text,
  approved boolean default false,
  created_at timestamptz default now()
);

create table rental_listing (
  id serial primary key,
  category text,
  city text,
  slug text unique,
  partner_url text,
  is_placeholder boolean default true,
  rental_id int references rental(id)
);

-- RLS
alter table part   enable row level security;
alter table rental enable row level security;
alter table rental_listing enable row level security;

create policy "anon read parts"   on part   for select using (true);
create policy "anon read rentals" on rental for select using (true);
create policy "anon read listings" on rental_listing for select using (true);

-- Seed data
insert into category (name) values ('charger-modules'), ('forklift');
insert into system   (name) values ('electrical');
insert into brand    (name) values ('EnerSys');
insert into part (sku,name,description,price,brand_id,system_id,category_id,slug)
values ('6LA20671','EnerSys Charger Module','24‑48 V charger',1125.00,
        (select id from brand where name='EnerSys'),
        (select id from system where name='electrical'),
        (select id from category where name='charger-modules'),
        'enersys-6la20671');
insert into city (name,state) values ('Cheyenne','WY');
insert into rental_listing (category,city,slug)
values ('forklift','cheyenne-wy','forklift-cheyenne-wy'); 