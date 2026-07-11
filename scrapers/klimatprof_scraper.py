"""
Парсер каталога klimatprof.online
Использует Playwright (JS-рендеринг).
Результат: scraped_klimatprof.json

Установка Playwright перед запуском:
  pip install playwright
  playwright install chromium
"""

import re
import json
import time

from playwright.sync_api import sync_playwright, Page

BASE_URL = "https://klimatprof.online"
OUTPUT_FILE = "scraped_klimatprof.json"
DELAY = 1.0

# Категории для обхода
CATEGORIES = [
    ("/catalog/invertornye-split-sistemy/", "Инверторные сплит-системы", "кондиционер"),
    ("/catalog/split-sistemy-postoyannoy-proizvoditelnosti/", "Сплит-системы постоянной производительности", "кондиционер"),
    ("/catalog/invertornye-multisplit-sistemy/", "Инверторные мультисплит-системы", "кондиционер"),
    ("/catalog/invertornye-kassetnye-split-sistemy/", "Кассетные сплит-системы", "кондиционер"),
    ("/catalog/invertornye-kanalynye-split-sistemy/", "Канальные сплит-системы", "кондиционер"),
    ("/catalog/invertornye-napolno-potolochnye-split-sistemy/", "Напольно-потолочные сплит-системы", "кондиционер"),
    ("/catalog/ventiliacionnoe-oborudovanie/", "Вентиляционное оборудование", "вентиляция"),
    ("/catalog/fankoyly/", "Фанкойлы", "фанкойл"),
    ("/catalog/chillery/", "Чиллеры", "чиллер"),
]


def parse_price(text: str) -> int:
    digits = re.sub(r"[^\d]", "", text)
    return int(digits) if digits else 0


def parse_number(text: str):
    text = text.replace(",", ".").strip()
    m = re.search(r"[\d]+\.?[\d]*", text)
    return float(m.group()) if m else None


def get_product_links(page: Page, category_url: str) -> list[str]:
    """Собирает ссылки на все товары в категории (с пагинацией)."""
    links = set()
    url = BASE_URL + category_url

    while url:
        page.goto(url, wait_until="networkidle", timeout=30000)
        time.sleep(1)

        # Ищем ссылки на товары
        anchors = page.query_selector_all("a[href*='/catalog/']")
        for a in anchors:
            href = a.get_attribute("href") or ""
            # Товары — ссылки с достаточной вложенностью и не категории
            parts = [p for p in href.split("/") if p]
            if len(parts) >= 3 and not href.endswith("/catalog/"):
                full = href if href.startswith("http") else BASE_URL + href
                links.add(full)

        # Следующая страница
        next_btn = page.query_selector("a[rel='next'], .pagination__next, a:has-text('Следующая')")
        if next_btn:
            href = next_btn.get_attribute("href")
            url = (BASE_URL + href) if href and not href.startswith("http") else href
        else:
            url = None

    return list(links)


def scrape_product_page(page: Page, url: str, category: str, product_type: str) -> dict | None:
    """Парсит страницу одного товара."""
    try:
        page.goto(url, wait_until="networkidle", timeout=30000)
        time.sleep(0.5)

        product = {
            "source_url": url,
            "category": category,
            "product_type": product_type,
            "specs": {},
        }

        # Название
        h1 = page.query_selector("h1")
        product["name"] = h1.inner_text().strip() if h1 else ""
        if not product["name"]:
            return None

        # Slug из URL
        slug = url.rstrip("/").split("/")[-1]
        product["slug"] = slug.lower()
        product["model_number"] = slug

        # Бренд — первое слово
        name_parts = product["name"].split()
        product["brand"] = name_parts[0] if name_parts else ""

        # Цена
        price_el = page.query_selector(".price, [class*='price'], [class*='Price']")
        product["price_unit"] = parse_price(price_el.inner_text()) if price_el else 0

        # Характеристики — ищем таблицы или dl/dt/dd / ul/li с ":"
        product["power_kw"] = None
        product["area_max"] = None
        product["energy_class"] = "A"
        product["noise_indoor_db"] = None
        product["noise_outdoor_db"] = None
        product["inverter"] = False
        product["wifi"] = False
        product["heating"] = True
        product["air_purifier"] = False

        # Таблица характеристик
        rows = page.query_selector_all("tr, .spec-row, [class*='spec'] li, [class*='char'] li")
        for row in rows:
            text = row.inner_text(separator=": ").strip()
            if ":" not in text:
                continue
            key, _, val = text.partition(":")
            key = key.strip().lower()
            val = val.strip()

            if not key or not val:
                continue

            if any(w in key for w in ["площадь", "комнат"]):
                n = parse_number(val)
                if n:
                    product["area_max"] = int(n)
            elif "холодопроизводительность" in key or ("мощность" in key and "охлажд" in key):
                n = parse_number(val)
                if n:
                    product["power_kw"] = round(n, 1)
            elif "класс энергоэффективности" in key:
                m = re.search(r"A\+*|B|C", val)
                if m and "охлажд" in key:
                    product["energy_class"] = m.group()
            elif "шум" in key and "внутр" in key:
                m = re.search(r"\d+", val)
                if m:
                    product["noise_indoor_db"] = int(m.group())
            elif "шум" in key and "наруж" in key:
                m = re.search(r"\d+", val)
                if m:
                    product["noise_outdoor_db"] = int(m.group())
            elif "инвертор" in key or "технологи" in key:
                if "инвертор" in val.lower():
                    product["inverter"] = True
            else:
                if len(val) < 200:
                    product["specs"][key.capitalize()] = val

        # Wifi/очистка из текста
        page_text = page.inner_text("body").lower()
        if "wi-fi" in page_text or "wifi" in page_text:
            product["wifi"] = True
        if "inverter" in page_text or "инвертор" in page_text:
            product["inverter"] = True
        if "очистк" in page_text or "фильтр" in page_text:
            product["air_purifier"] = True

        # Площадь по мощности
        if not product["area_max"] and product["power_kw"]:
            product["area_max"] = int(product["power_kw"] * 10)

        # Изображения
        images = []
        for img in page.query_selector_all("img"):
            src = img.get_attribute("src") or ""
            if any(x in src for x in ["/upload/", "/images/", "/img/"]) and src not in images:
                full = src if src.startswith("http") else BASE_URL + src
                images.append(full)
        product["images"] = images[:8]

        # Дефолтные поля
        product["available"] = True
        product["lead_days"] = 7
        product["is_featured"] = False
        product["is_new"] = False
        product["is_promo"] = False
        product["price_install"] = 0

        return product

    except Exception as e:
        print(f"  Ошибка: {e}")
        return None


def main():
    results = []
    errors = []

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_extra_http_headers({"Accept-Language": "ru-RU,ru;q=0.9"})

        for cat_path, cat_name, prod_type in CATEGORIES:
            print(f"\n=== {cat_name} ===")
            links = get_product_links(page, cat_path)
            print(f"Найдено товаров: {len(links)}")

            for i, url in enumerate(links, 1):
                print(f"  [{i}/{len(links)}] {url}")
                product = scrape_product_page(page, url, cat_name, prod_type)
                if product and product.get("name"):
                    results.append(product)
                    print(f"    OK: {product['name'][:50]} | {product.get('price_unit', 0)} ₽")
                else:
                    errors.append(url)
                    print("    SKIP")
                time.sleep(DELAY)

        browser.close()

    print(f"\nГотово: {len(results)} товаров, {len(errors)} ошибок")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Сохранено: {OUTPUT_FILE}")

    if errors:
        with open("klimatprof_errors.txt", "w") as f:
            f.write("\n".join(errors))
        print(f"Ошибки: klimatprof_errors.txt")


if __name__ == "__main__":
    main()
