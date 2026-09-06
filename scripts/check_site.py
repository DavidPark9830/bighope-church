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

page = SiteParser()
page.feed((ROOT / 'index.html').read_text())
for link in page.links:
    url = urlsplit(link)
    if url.scheme or url.netloc:
        continue
    if url.path:
        assert (ROOT / unquote(url.path)).is_file(), f'Missing file: {link}'
    elif url.fragment:
        assert url.fragment in page.ids, f'Missing section: {link}'
print(f'OK: {len(page.links)} links/assets and {len(page.ids)} unique IDs checked.')
