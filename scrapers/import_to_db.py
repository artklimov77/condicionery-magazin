"""
Импорт спарсенных товаров в PostgreSQL.
Читает scraped_daichi.json и scraped_klimatprof.json → вставляет в таблицу products.

Перед запуском задай DATABASE_URL в .env или переменной окружения:
  DATABASE_URL=postgresql://postgres:password@localhost:5432/nordic_air
"""

import json
import os
import re
import uuid
from pathlib import Path

import psycopg2
from psycopg2.extras import execute_values, Json
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env.local")

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL не задан")

# Категории → UUID (будут созданы если не существуют)
CATEGORIES = [
    ("Бытовые кондиционеры", "bytovye-konditsionery", 1),
    ("Мультисплит-системы", "multisplit-sistemy", 2),
    ("Полупромышленные кондиционеры", "polupromyshlennye-konditsionery", 3),
    ("VRF системы", "vrf-sistemy", 4),
    ("Чиллеры", "chillery", 5),
    ("Фанкойлы", "fankoyly", 6),
    ("Вентиляция", "ventilyaciya", 7),
    ("Тепловые насосы", "teplovye-nasosy", 8),
    ("Мобильные кондиционеры", "mobilnye-konditsionery", 9),
    ("Прочее", "prochee", 99),
]

CATEGORY_NAMES = {
    "бытовые кондиционеры": "Бытовые кондиционеры",
    "инверторные сплит-системы": "Бытовые кондиционеры",
    "сплит-системы постоянной производительности": "Бытовые кондиционеры",
    "мультисплит-системы": "Мультисплит-системы",
    "инверторные мультисплит-системы": "Мультисплит-системы",
    "полупромышленные кондиционеры": "Полупромышленные кондиционеры",
    "кассетные сплит-системы": "Полупромышленные кондиционеры",
    "канальные сплит-системы": "Полупромышленные кондиционеры",
    "напольно-потолочные сплит-системы": "Полупромышленные кондиционеры",
    "vrf системы": "VRF системы",
    "чиллеры": "Чиллеры",
    "фанкойлы": "Фанкойлы",
    "вентиляция": "Вентиляция",
    "вентиляционное оборудование": "Вентиляция",
    "мобильные кондиционеры": "Мобильные кондиционеры",
}


def slugify(text: str) -> str:
    """Создаёт уникальный slug из текста."""
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9а-яё\-]", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text[:100]


def ensure_unique_slug(cursor, slug: str, table: str) -> str:
    """Добавляет суффикс если slug занят."""
    base = slug
    i = 1
    while True:
        cursor.execute(f"SELECT 1 FROM {table} WHERE slug = %s", (slug,))
        if not cursor.fetchone():
            return slug
        slug = f"{base}-{i}"
        i += 1


def main():
    files = ["scraped_daichi.json", "scraped_klimatprof.json"]
    all_products = []
    for f in files:
        path = Path(__file__).parent / f
        if path.exists():
            with open(path, encoding="utf-8") as fh:
                data = json.load(fh)
                all_products.extend(data)
                print(f"Загружено из {f}: {len(data)} товаров")
        else:
            print(f"Файл не найден: {f}")

    if not all_products:
        print("Нет данных для импорта")
        return

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # Создаём категории
    category_ids = {}
    for name, slug, order in CATEGORIES:
        cur.execute(
            """INSERT INTO categories (id, name, slug, sort_order)
               VALUES (%s, %s, %s, %s)
               ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
               RETURNING id""",
            (str(uuid.uuid4()), name, slug, order),
        )
        row = cur.fetchone()
        if not row:
            cur.execute("SELECT id FROM categories WHERE slug = %s", (slug,))
            row = cur.fetchone()
        category_ids[name] = row[0]

    conn.commit()
    print(f"Категории: {len(category_ids)}")

    # Импорт товаров
    inserted = 0
    skipped = 0

    for p in all_products:
        # Категория
        cat_name_raw = (p.get("category") or "").lower()
        cat_display = CATEGORY_NAMES.get(cat_name_raw, "Бытовые кондиционеры")
        cat_id = category_ids.get(cat_display, category_ids["Прочее"])

        # Slug
        raw_slug = p.get("slug") or slugify(p.get("name", "") + "-" + p.get("model_number", ""))
        slug = ensure_unique_slug(cur, raw_slug, "products")

        # Мощность и площадь — дефолты если не спарсили
        power_kw = p.get("power_kw") or 2.5
        area_max = p.get("area_max") or int(power_kw * 10)

        try:
            cur.execute(
                """INSERT INTO products (
                    id, name, slug, brand, category_id, model_number,
                    power_kw, area_max, energy_class,
                    noise_indoor_db, noise_outdoor_db,
                    inverter, wifi, heating, air_purifier, smart_home,
                    price_unit, price_install,
                    available, lead_days,
                    images, description, specs,
                    is_featured, is_new, is_promo,
                    product_type, source_url,
                    created_at, updated_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s,
                    %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s,
                    %s, %s,
                    %s, %s, %s,
                    %s, %s, %s,
                    %s, %s,
                    NOW(), NOW()
                )
                ON CONFLICT (slug) DO NOTHING""",
                (
                    str(uuid.uuid4()),
                    p.get("name", "")[:255],
                    slug,
                    p.get("brand", "")[:100],
                    cat_id,
                    p.get("model_number", "")[:100],
                    power_kw,
                    area_max,
                    p.get("energy_class", "A")[:10],
                    p.get("noise_indoor_db"),
                    p.get("noise_outdoor_db"),
                    bool(p.get("inverter", False)),
                    bool(p.get("wifi", False)),
                    bool(p.get("heating", True)),
                    bool(p.get("air_purifier", False)),
                    False,
                    p.get("price_unit", 0),
                    p.get("price_install", 0),
                    bool(p.get("available", True)),
                    p.get("lead_days", 7),
                    p.get("images", []),
                    p.get("description"),
                    Json(p.get("specs", {})),
                    False,
                    bool(p.get("is_new", False)),
                    False,
                    p.get("product_type", "кондиционер")[:50],
                    p.get("source_url", "")[:500],
                ),
            )
            inserted += 1
        except Exception as e:
            print(f"  Ошибка вставки '{p.get('name', '')}': {e}")
            conn.rollback()
            skipped += 1
            continue

        if inserted % 50 == 0:
            conn.commit()
            print(f"  Вставлено: {inserted}...")

    conn.commit()
    cur.close()
    conn.close()

    print(f"\nИмпорт завершён: {inserted} вставлено, {skipped} пропущено")


if __name__ == "__main__":
    main()
