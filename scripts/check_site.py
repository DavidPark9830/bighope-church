"""Check local assets and anchor destinations before publishing."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate id: {attrs['id']}"
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if key in attrs:
                self.links.append(attrs[key])

pages = sorted(ROOT.rglob('*.html'))
link_count = 0
id_count = 0
for html_file in pages:
    page = SiteParser()
    page.feed(html_file.read_text())
    link_count += len(page.links)
    id_count += len(page.ids)
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        if url.path:
            target = (html_file.parent / unquote(url.path)).resolve()
            exists = target.is_file() or (target.is_dir() and (target / 'index.html').is_file())
            assert exists, f'Missing file from {html_file.relative_to(ROOT)}: {link}'
        elif url.fragment:
            assert url.fragment in page.ids, f'Missing section in {html_file.relative_to(ROOT)}: {link}'
print(f'OK: {len(pages)} HTML files, {link_count} links/assets and {id_count} unique IDs checked.')
