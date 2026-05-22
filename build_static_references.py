import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / "source_google_doc_export.txt"
OUT = ROOT / "data" / "original-references.json"

TOPIC_ALIASES = {
    "AI in Learning": ["AI on learning", "Positive Influences of AI on Education/Learning and Teaching", "Positive Influences of AI on Learning/Education"],
    "AI in Work and Society": ["AI work/society", "Positive Influences of AI on Society", "Positive Influences of AI on Work/Jobs"],
    "Social Media and Influencers": ["social media", "Positive Influences of Social Media Influencers"],
    "Interdisciplinary Courses": ["Interdisciplinary Courses"],
    "Online vs. Traditional Classes": ["Online/traditional Classes", "Online Classes", "Traditional Courses"],
    "Printed vs. Online Reading": ["printed/online reading", "Printed Books", "Online Reading"],
    "Studying Abroad": ["school courses teach test campus", "Benefits of Studying Abroad"],
    "University Course Requirements": ["Downsides of Taking Liberal Arts Courses", "Downsides of Taking PE Courses"],
    "Standardized Tests": ["Traditional Tests", "standardized tests"],
    "Cellphones in Class": ["Benefits of Limiting or Banning Cellphone Use in Class"],
    "School Uniforms": ["Benefits of Requiring School Uniforms"],
    "Electives vs. Required Credits": ["Benefits of Introducing More Electives"],
    "Economic Growth vs. Environment": ["economics VS environment", "Economic growth VS environment"],
    "Electric vs. Traditional Cars": ["electric or traditional cars"],
    "Checkups vs. Healthy Diet": ["checkups VS diet"],
    "Dupe Culture and Trends": ["culture social trend", "Benefits of Dupe Culture"],
    "Stress and Leisure": ["leisure music movie PE stress"],
    "Travel and Gap Year": ["travel gap year"],
    "Environment and Natural Disasters": ["natural disaster", "Environment", "Protecting the Environment by Reducing Plastic Waste"],
    "Learning Skills and Languages": ["new skill/language", "Benefits of Learning New Skill Sets"],
    "Volunteering": ["Volunteering"],
    "Part-Time Jobs for Students": ["jobs career economics", "Benefits of Taking a Part-Time Job"],
    "Online Shopping and Payment": ["online payment/shopping"],
    "Targeted Advertising": ["advertising", "Benefits of Targeted Advertising"],
    "Changing Laws: Voting Age and Equality": ["change laws (age/gender)", "Benefits of Lowering Age Requirements for Voting"],
    "Military Service": ["military", "Benefits of Conscription"],
    "Government Intervention": ["government intervene", "Government Should Intervene to Boost the Economy"],
}


def clean_source_lines(lines):
    cleaned = []
    for line in lines:
        value = line.strip()
        if not value:
            continue
        if value in {"________________", "------", "--------", "----------------------"}:
            continue
        if "____________________" in value:
            continue
        cleaned.append(value)
    return "\n".join(cleaned).replace("\n\n\n", "\n\n")


def find_excerpt(lines, topic, aliases, all_aliases):
    start = -1
    for index, line in enumerate(lines):
        lower = line.lower()
        if any(alias.lower() in lower for alias in aliases):
            start = index
            break

    if start < 0:
        return "No matching original Google Doc section was found for this topic."

    end = min(len(lines), start + 95)
    active_aliases = {alias.lower() for alias in aliases}
    for index in range(start + 12, min(len(lines), start + 180)):
        line = lines[index].strip().lower()
        if not line:
            continue
        if any(alias not in active_aliases and line == alias for alias in all_aliases):
            end = index
            break

    excerpt = clean_source_lines(lines[start:end]).strip()
    if len(excerpt) > 4500:
        excerpt = f"{excerpt[:4500].strip()}\n\n[Excerpt shortened from the original Google Doc section.]"
    return excerpt


def main():
    text = SOURCE.read_text(encoding="utf-8-sig")
    lines = text.splitlines()
    all_aliases = [alias.lower() for aliases in TOPIC_ALIASES.values() for alias in aliases]
    references = {
        topic: find_excerpt(lines, topic, aliases, all_aliases)
        for topic, aliases in TOPIC_ALIASES.items()
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(references, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
