"""Build src/config/legal-content.js from exported docx paragraphs."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / 'scripts' / 'legal-content-export.json'
OUT = ROOT / 'src' / 'config' / 'legal-content.js'

DOC_META = {
    'terms': {
        'title': 'Terms & Conditions',
        'route': '/terms',
        'description': 'Terms and conditions for using the Kardosh Realty website and services.',
        'lastUpdated': 'June 2026',
    },
    'privacy': {
        'title': 'Privacy Policy',
        'route': '/privacy',
        'description': 'How Kardosh Realty collects, uses, and protects your personal information.',
        'lastUpdated': 'June 2026',
    },
    'cookie': {
        'title': 'Cookie Policy',
        'route': '/cookie-policy',
        'description': 'How Kardosh Realty uses cookies and similar technologies on this website.',
        'lastUpdated': 'June 2026',
    },
    'finance': {
        'title': 'Finance Policy',
        'route': '/finance-policy',
        'description': 'General information about property financing and investment considerations at Kardosh Realty.',
        'lastUpdated': 'June 2026',
    },
}

LOWERCASE_MIDDLE = {
    'the', 'a', 'an', 'of', 'to', 'for', 'in', 'on', 'with', 'how', 'when', 'your', 'our',
    'we', 'may', 'are', 'is', 'be', 'by', 'at', 'as', 'or', 'and', 'from', 'that', 'this',
}


def load_export():
    raw = EXPORT.read_bytes()
    text = raw.decode('utf-16') if raw[:2] == b'\xff\xfe' else raw.decode('utf-8-sig')
    return json.loads(text)


def trim_body(paras: list[str]) -> list[str]:
    body = paras[1:] if paras else []
    end = len(body)
    for i, line in enumerate(body):
        if line == 'Contact Us' or line.startswith('Last Updated:'):
            end = i
            break
    return body[:end]


def looks_like_title(line: str) -> bool:
    text = line.rstrip(':').strip()
    if not text:
        return False
    if text.endswith('?'):
        return True
    words = text.split()
    if len(words) >= 2 and words[1].lower() in LOWERCASE_MIDDLE and not text.endswith('?'):
        return False
    if len(words) == 1:
        return words[0][0].isupper()
    caps = sum(1 for w in words if w and w[0].isupper())
    return caps >= max(2, len(words) // 2) or '&' in text


def is_list_item(line: str, idx: int, paras: list[str]) -> bool:
    if not line or len(line) > 120:
        return False
    if line.endswith('.') and len(line) > 85:
        return False
    if looks_like_title(line) and not paras[idx - 1].endswith(':') if idx > 0 else True:
        if idx > 0 and not paras[idx - 1].endswith(':'):
            prev = paras[idx - 1]
            if looks_like_title(prev) and not prev.endswith(':'):
                return False
    if idx > 0 and paras[idx - 1].endswith(':'):
        return True
    if idx > 0 and paras[idx - 1] and not paras[idx - 1].endswith('.') and len(paras[idx - 1]) < 90:
        if idx > 1 and paras[idx - 2].endswith(':'):
            return True
    return False


def is_heading(line: str, idx: int, paras: list[str]) -> bool:
    if not line or line.startswith('Last Updated') or line == 'Contact Us':
        return False
    if len(line) > 120:
        return False
    if idx > 0 and paras[idx - 1].endswith(':'):
        return False
    if line.endswith('.') and len(line) > 55:
        return False
    return looks_like_title(line)


def collect_list_items(start: int, paras: list[str]) -> tuple[list[str], int]:
    items = []
    i = start
    while i < len(paras) and is_list_item(paras[i], i, paras):
        items.append(paras[i])
        i += 1
    return items, i


def parse_sections(paras: list[str]) -> list[dict]:
    body = trim_body(paras)
    sections: list[dict] = []
    i = 0

    while i < len(body):
        line = body[i]

        if line.endswith(':') and i + 1 < len(body):
            items, j = collect_list_items(i + 1, body)
            if len(items) >= 2:
                intro = line
                if sections and not sections[-1]['paragraphs'] and not sections[-1]['items']:
                    sections[-1]['paragraphs'] = [intro]
                    sections[-1]['items'] = items
                elif sections and sections[-1]['items']:
                    sections[-1]['paragraphs'].append(intro)
                    sections[-1]['items'].extend(items)
                else:
                    sections.append({'heading': None, 'paragraphs': [intro], 'items': items})
                i = j
                continue

        if is_heading(line, i, body):
            heading = line.rstrip(':').strip()
            i += 1
            paragraphs = []
            items = []

            while i < len(body) and not is_heading(body[i], i, body):
                current = body[i]
                if current.endswith(':') and i + 1 < len(body):
                    sub_items, j = collect_list_items(i + 1, body)
                    if len(sub_items) >= 2:
                        paragraphs.append(current)
                        items.extend(sub_items)
                        i = j
                        continue
                if is_list_item(current, i, body) and (items or (i > 0 and body[i - 1].endswith(':'))):
                    run, j = collect_list_items(i, body)
                    items.extend(run)
                    i = j
                    continue
                paragraphs.append(current)
                i += 1

            sections.append({'heading': heading, 'paragraphs': paragraphs, 'items': items})
            continue

        sections.append({'heading': None, 'paragraphs': [line], 'items': []})
        i += 1

    return [s for s in sections if s['heading'] or s['paragraphs'] or s['items']]


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def main():
    data = load_export()
    docs = {key: {**DOC_META[key], 'sections': parse_sections(paras)} for key, paras in data.items()}

    lines = [
        '/** Legal page copy — generated from client docx via scripts/build-legal-content.py */',
        '',
        'export const LEGAL_PAGES = ' + json.dumps(docs, ensure_ascii=False, indent=2),
        '',
        'export const LEGAL_FOOTER_LINKS = [',
    ]
    for key in ('terms', 'privacy', 'cookie', 'finance'):
        doc = docs[key]
        lines.append(f"  {{ label: {js_string(doc['title'])}, to: {js_string(doc['route'])} }},")
    lines.extend([
        ']',
        '',
        'export function getLegalPage(key) {',
        '  return LEGAL_PAGES[key] || null',
        '}',
        '',
    ])

    OUT.write_text('\n'.join(lines), encoding='utf-8')
    print(f'[legal-content] wrote {OUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
