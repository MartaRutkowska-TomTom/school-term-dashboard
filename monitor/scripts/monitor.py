import json
import yaml
import requests
from bs4 import BeautifulSoup
from datetime import date
from pathlib import Path

# ===== ŚCIEŻKI =====
BASE_DIR = Path(__file__).resolve().parents[1]

COUNCILS_FILE = BASE_DIR / "sources" / "councils.yml"
KEYWORDS_FILE = BASE_DIR / "sources" / "keywords.yml"
SEEN_FILE = BASE_DIR / "data" / "seen_urls.json"

OUTPUT_FILE = Path("data/new-releases.json")


# ===== POMOCNICZE =====
def load_yaml(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_seen():
    if SEEN_FILE.exists():
        with open(SEEN_FILE, "r", encoding="utf-8") as f:
            return set(json.load(f))
    return set()


def save_seen(seen):
    SEEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(SEEN_FILE, "w", encoding="utf-8") as f:
        json.dump(sorted(seen), f, indent=2)


def keyword_match(text, keywords):
    text = text.lower()
    return any(k in text for k in keywords)


# ===== GŁÓWNA LOGIKA =====
def main():
    print("=== UK School Streets monitoring ===")

    councils = load_yaml(COUNCILS_FILE)["councils"]
    keywords = load_yaml(KEYWORDS_FILE)

    primary_keywords = keywords.get("primary", [])
    secondary_keywords = keywords.get("secondary", [])

    seen_urls = load_seen()
    new_items = []

    for council in councils:
        search_url = council["base_url"] + council["search_path"]
