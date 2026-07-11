"""
Парсер каталога daichi.business
Использует sitemap для получения всех URL товаров, затем парсит каждый.
Результат: scraped_daichi.json
"""

import re
import json
import time
import xml.etree.ElementTree as ET
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://daichi.business"
SITEMAP_URL = "https://daichi.business/sitemap-iblock-4.xml"
OUTPUT_FILE = "scraped_daichi.json"
DELAY = 0.7  # секунды между запросами

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "ru-RU,ru;q=0.9",
}

# Маппинг категорий сайта на наши
CATEGORY_MAP = {
    "bytovye_konditsionery": "Бытовые кондиционеры",
    "multisplit_sistemy": "Мультисплит-системы",
    "polupromyshlennye_konditsionery": "Полупромышленные кондиционеры",
    "mobilnye_konditsionery": "Мобильные кондиционеры",
    "okonnye_konditsionery": "Оконные кондиционеры",
    "vrf-sistemy": "VRF системы",
    "chillery": "Чиллеры",
    "fankoyly": "Фанкойлы",
    "kompressorno-kondensatornye-bloki": "Компрессорно-конденсаторные блоки",
    "kryshnye_konditsionery": "Крышные кондиционеры",
    "ventilyaciya": "Вентиляция",
    "otoplenie": "Отопление",
}

# Маппинг характеристик из li-списков на наши поля
SPEC_MAP = {
    "для помещения площадью": "area_max",
    "холодопроизводительность": "power_kw",
    "теплопроизводительность": "heat_kw",
    "класс энергоэффективности (охлаждение)": "energy_class",
    "класс энергоэффективности (обогрев)": "energy_class_heat",
    "уровень шума (внутренний блок)": "noise_indoor_db",
    "уровень шума (наружный блок)": "noise_outdoor_db",
    "хладагент": "refrigerant",
    "технология": "technology",
    "страна изготовитель": "country",
    "срок эксплуатации": "warranty_years",
}


def get_product_urls():
    """Получает все URL товаров из sitemap."""
    print(f"Загружаю sitemap: {SITEMAP_URL}")
    resp = requests.get(SITEMAP_URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()

    root = ET.fromstring(resp.text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    all_urls = [loc.text for loc in root.findall(".//sm:loc", ns)]
    print(f"Всего URL в sitemap: {len(all_urls)}")

    # Фильтруем только страницы товаров (содержат /komplekty/ или /naruzhnye-bloki/)
    product_urls = []
    for url in all_urls:
        path = url.replace(BASE_URL, "").rstrip("/")
        parts = [p for p in path.split("/") if p]
        # Продукт: 4+ сегментов И последний сегмент — модель (буквы+цифры+_)
        if len(parts) >= 4 and re.match(r"^[A-Za-z0-9_\-\.]+$", parts[-1]):
            product_urls.append(url)

    print(f"URL товаров: {len(product_urls)}")
    return product_urls


def detect_category(url):
    """Определяет категорию товара по URL."""
    for key, name in CATEGORY_MAP.items():
        if key in url:
            return name
    return "Прочее"


def parse_price(text):
    """Извлекает число из строки с ценой."""
    digits = re.sub(r"[^\d]", "", text)
    return int(digits) if digits else 0


def parse_number(text):
    """Извлекает число (целое или дробное) из строки."""
    text = text.replace(",", ".").strip()
    m = re.search(r"[\d]+\.?[\d]*", text)
    return float(m.group()) if m else None


def parse_noise(text):
    """Извлекает первое число из строки шума (напр. '38/27 дБ(А)' → 38)."""
    m = re.search(r"\d+", text)
    return int(m.group()) if m else None


def scrape_product(url):
    """Парсит страницу одного товара."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, "lxml")

        product = {
            "source_url": url,
            "category": detect_category(url),
            "specs": {},
        }

        # Название
        h1 = soup.find("h1")
        product["name"] = h1.get_text(strip=True) if h1 else ""

        # Артикул из URL
        slug = url.rstrip("/").split("/")[-1]
        product["slug"] = slug.lower().replace("_", "-")
        product["model_number"] = slug.replace("_", "/")

        # Бренд — первое слово названия
        name_parts = product["name"].split()
        product["brand"] = name_parts[0] if name_parts else ""

        # Цена — ищем "рекомендованная розничная цена" рядом с числом
        price_block = soup.find(string=re.compile(r"рекомендованная", re.I))
        if price_block:
            parent = price_block.parent
            price_text = parent.get_text()
            product["price_unit"] = parse_price(price_text)
        else:
            # Попробуем найти любой элемент с ценой
            for el in soup.find_all(string=re.compile(r"\d[\d\s]*[₽руб]", re.I)):
                p = parse_price(el)
                if 5000 < p < 5_000_000:
                    product["price_unit"] = p
                    break
            else:
                product["price_unit"] = 0

        # Характеристики из li
        product["power_kw"] = None
        product["area_max"] = None
        product["energy_class"] = "A"
        product["noise_indoor_db"] = None
        product["noise_outdoor_db"] = None
        product["inverter"] = False
        product["wifi"] = False
        product["heating"] = True  # большинство сплитов умеют греть
        product["air_purifier"] = False
        product["refrigerant"] = None

        for li in soup.find_all("li"):
            text = li.get_text(strip=True)
            if ":" not in text:
                continue
            key, _, val = text.partition(":")
            key = key.strip().lower()
            val = val.strip()

            mapped = next((f for k, f in SPEC_MAP.items() if k in key), None)

            if mapped == "area_max":
                n = parse_number(val)
                if n:
                    product["area_max"] = int(n)

            elif mapped == "power_kw":
                n = parse_number(val)
                if n:
                    product["power_kw"] = round(n, 1)

            elif mapped == "energy_class":
                m = re.search(r"A\+*|B|C", val)
                if m:
                    product["energy_class"] = m.group()

            elif mapped == "noise_indoor_db":
                product["noise_indoor_db"] = parse_noise(val)

            elif mapped == "noise_outdoor_db":
                product["noise_outdoor_db"] = parse_noise(val)

            elif mapped == "refrigerant":
                product["refrigerant"] = val
                product["specs"]["Хладагент"] = val

            elif mapped == "technology":
                if "inverter" in val.lower() or "инвертор" in val.lower():
                    product["inverter"] = True

            else:
                # Прочие характеристики сохраняем в specs
                if key and val and len(val) < 200:
                    product["specs"][key.capitalize()] = val

        # Wifi — ищем по тексту страницы
        page_text = soup.get_text().lower()
        if "wi-fi" in page_text or "wifi" in page_text:
            product["wifi"] = True
        if "очистк" in page_text or "фильтр" in page_text:
            product["air_purifier"] = True

        # Если мощность не нашли — пробуем из имени (напр. AIR20 → 2.0 кВт)
        if not product["power_kw"]:
            m = re.search(r"(\d{2})(?:AVQ|EV|AVQS)", product["model_number"])
            if m:
                product["power_kw"] = round(int(m.group(1)) / 10, 1)

        # Площадь по мощности если не нашли
        if not product["area_max"] and product["power_kw"]:
            product["area_max"] = int(product["power_kw"] * 10)

        # Изображения
        images = []
        for img in soup.find_all("img"):
            src = img.get("src", "")
            if "/upload/iblock/" in src:
                full_url = urljoin(BASE_URL, src)
                if full_url not in images:
                    images.append(full_url)
        product["images"] = images[:8]

        # Флаги
        product["available"] = True
        product["lead_days"] = 7
        product["is_featured"] = False
        product["is_new"] = False
        product["is_promo"] = False
        product["price_install"] = 0
        product["product_type"] = "кондиционер"

        return product

    except Exception as e:
        print(f"  Ошибка: {e}")
        return None


def main():
    urls = get_product_urls()
    results = []
    errors = []

    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] {url}")
        product = scrape_product(url)
        if product:
            results.append(product)
            print(f"  OK: {product['name'][:60]} | {product.get('price_unit', 0)} ₽")
        else:
            errors.append(url)
            print("  SKIP")

        time.sleep(DELAY)

    print(f"\nГотово: {len(results)} товаров, {len(errors)} ошибок")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Сохранено: {OUTPUT_FILE}")

    if errors:
        with open("daichi_errors.txt", "w") as f:
            f.write("\n".join(errors))
        print(f"Ошибки: daichi_errors.txt")


if __name__ == "__main__":
    main()
