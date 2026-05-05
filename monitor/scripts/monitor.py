import json
from datetime import date
from pathlib import Path

print("UK School Streets monitoring started")

output = {
    "generated": date.today().isoformat(),
    "items": []
}

Path("data").mkdir(exist_ok=True)

with open("data/new-releases.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

print("Generated data/new-releases.json")
