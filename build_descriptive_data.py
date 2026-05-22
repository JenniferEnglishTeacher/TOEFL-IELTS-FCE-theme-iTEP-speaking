import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / "descriptive_speaking_60_source.txt"
OUT = ROOT / "descriptive-data.js"


def short_title(prompt):
    text = prompt.strip().rstrip(".?")
    text = re.sub(r"^Describe\s+", "", text, flags=re.I)
    text = re.sub(r"^an?\s+", "", text, flags=re.I)
    text = re.sub(r"^your\s+", "Your ", text, flags=re.I)
    text = text[:1].upper() + text[1:]
    if len(text) <= 54:
        return text
    return text[:51].rstrip() + "..."


def clean_model(line):
    line = re.sub(r"^Model Answer\s*(?:\([^)]*\))?\s*:\s*", "", line.strip(), flags=re.I)
    return line.strip().strip('"').strip()


def clean_keyword(line):
    return re.sub(r"^\s*\d+\.\s*", "", line).strip()


def parse():
    text = SOURCE.read_text(encoding="utf-8-sig")
    raw_lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in raw_lines if line]
    items = []
    category = "General"
    i = 0
    while i < len(lines):
      line = lines[i]
      cat_match = re.match(r"Category\s+\d+\s*:\s*(.+)", line, flags=re.I)
      if cat_match:
          category = cat_match.group(1).strip()
          i += 1
          continue

      prompt_match = re.match(r"Prompt\s+(\d+)\b", line, flags=re.I)
      if not prompt_match:
          i += 1
          continue

      number = int(prompt_match.group(1))
      j = i + 1
      while j < len(lines) and (lines[j].startswith("_") or not lines[j]):
          j += 1
      if j >= len(lines):
          break
      prompt = lines[j].strip()
      j += 1
      while j < len(lines) and not re.match(r"Model Answer", lines[j], flags=re.I):
          j += 1
      if j >= len(lines):
          i += 1
          continue
      model = clean_model(lines[j])
      j += 1
      keywords = []
      while j < len(lines):
          if re.match(r"Prompt\s+\d+\b", lines[j], flags=re.I) or re.match(r"Category\s+\d+\s*:", lines[j], flags=re.I):
              break
          kw = re.match(r"\s*(\d+)\.\s+(.+)", lines[j])
          if kw:
              keywords.append(clean_keyword(lines[j]))
          j += 1

      items.append({
          "number": number,
          "category": category,
          "title": f"{number}. {short_title(prompt)}",
          "prompt": prompt,
          "model": model,
          "keywords": keywords,
      })
      i = j
    return items


def main():
    items = parse()
    OUT.write_text(
        "const descriptivePrompts = "
        + json.dumps(items, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {len(items)} prompts to {OUT}")
    missing = [item["number"] for item in items if len(item["keywords"]) < 10]
    if missing:
        print("prompts with few keywords:", missing)


if __name__ == "__main__":
    main()
