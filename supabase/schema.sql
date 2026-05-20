-- =============================================
-- Condicionery Magazin — Supabase Schema
-- =============================================
-- Запускать в Supabase SQL Editor

-- Категории кондиционеров
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order int default 0
);

insert into categories (name, slug, sort_order) values
  ('Настенные (сплит)', 'nastennye', 1),
  ('Напольно-потолочные', 'napolno-potolochnye', 2),
  ('Кассетные', 'kassetnye', 3),
  ('Канальные', 'kanalnye', 4),
  ('Мульти-сплит', 'multi-split', 5),
  ('Мобильные', 'mobilnye', 6)
on conflict (slug) do nothing;

-- Товары
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand text not null,
  category_id uuid references categories(id),
  model_number text,

  -- Технические характеристики
  power_kw numeric(4,1) not null,         -- мощность охлаждения кВт
  area_min int,                            -- мин. площадь м²
  area_max int not null,                   -- макс. площадь м²
  energy_class text default 'A',          -- A / A+ / A++ / A+++
  noise_indoor_db int,                     -- шум внутреннего блока дБ
  noise_outdoor_db int,

  -- Функции
  inverter boolean default true,
  wifi boolean default false,
  heating boolean default true,            -- режим обогрева
  air_purifier boolean default false,
  smart_home boolean default false,

  -- Цены
  price_unit int not null,                 -- цена оборудования (руб.)
  price_install int default 0,            -- цена монтажа (руб.)
  promo_price int,                         -- акционная цена (null = нет акции)

  -- Логистика
  available boolean default true,
  lead_days int default 7,                 -- срок поставки (дней)

  -- Медиа и описание
  images text[] default '{}',             -- массив URL изображений
  description text,
  specs jsonb default '{}',              -- произвольные доп. характеристики

  -- Флаги витрины
  is_featured boolean default false,
  is_new boolean default false,
  is_promo boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Заявки
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),

  -- Источник заявки
  source text default 'catalog',          -- catalog / product / quiz / contacts
  product_id uuid references products(id),
  product_name text,                       -- денормализованное имя (на случай удаления товара)

  -- Данные квиза (если source = quiz)
  quiz_data jsonb,

  -- Контакт клиента
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  comment text,

  -- Работа с заявкой
  status text default 'new',             -- new / in_progress / done / cancelled

  created_at timestamptz default now()
);

-- CMS контент (тексты сайта)
create table if not exists content (
  key text primary key,
  value text not null,
  type text default 'text'               -- text / html / image
);

-- RLS: анонимные могут только читать товары и категории; писать заявки
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table content enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (available = true);
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public read content" on content for select using (true);

-- Service role обходит RLS (для admin API routes)

-- Индексы для быстрого поиска
create index if not exists products_brand_idx on products (brand);
create index if not exists products_category_idx on products (category_id);
create index if not exists products_price_idx on products (price_unit);
create index if not exists products_power_idx on products (power_kw);
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_idx on orders (created_at desc);

-- Seed: несколько демо-товаров
insert into products (name, slug, brand, model_number, power_kw, area_max, energy_class, noise_indoor_db, inverter, wifi, heating, price_unit, price_install, lead_days, is_featured, is_new)
select
  v.name, v.slug, v.brand, v.model, v.power, v.area, v.energy, v.noise, v.inverter, v.wifi, v.heating, v.price, v.install, v.lead, v.featured, v.is_new
from (values
  ('Daikin FTXB20C', 'daikin-ftxb20c', 'Daikin', 'FTXB20C', 2.0, 20, 'A+', 38, true, false, true, 42000, 18000, 7, true, false),
  ('Daikin FTXB25C', 'daikin-ftxb25c', 'Daikin', 'FTXB25C', 2.5, 25, 'A+', 38, true, false, true, 47000, 18000, 7, true, false),
  ('Mitsubishi MSZ-HR25VF', 'mitsubishi-msz-hr25vf', 'Mitsubishi Electric', 'MSZ-HR25VF', 2.5, 25, 'A++', 35, true, false, true, 55000, 18000, 10, true, false),
  ('LG S09EQ', 'lg-s09eq', 'LG', 'S09EQ', 2.7, 27, 'A+++', 32, true, true, true, 38000, 18000, 5, true, true),
  ('Samsung AR09BXHQ', 'samsung-ar09bxhq', 'Samsung', 'AR09BXHQASINUA', 2.6, 26, 'A++', 36, true, true, true, 35000, 18000, 5, false, true),
  ('Haier AS25S2SF2FA', 'haier-as25s2sf2fa', 'Haier', 'AS25S2SF2FA-W', 2.5, 25, 'A+', 38, true, false, true, 28000, 18000, 7, false, false),
  ('Gree GWH09AAD', 'gree-gwh09aad', 'Gree', 'GWH09AAD-K6DNA1A', 2.7, 27, 'A+', 40, true, false, true, 25000, 18000, 7, false, false),
  ('Pioneer WYS012GMFI22HN', 'pioneer-wys012gmfi22hn', 'Pioneer', 'WYS012GMFI22HN', 3.5, 35, 'A+', 38, true, false, true, 38000, 18000, 7, false, false)
) as v(name, slug, brand, model, power, area, energy, noise, inverter, wifi, heating, price, install, lead, featured, is_new)
on conflict (slug) do nothing;
