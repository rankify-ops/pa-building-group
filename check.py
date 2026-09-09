#!/usr/bin/env python3
"""Link, anchor and asset integrity check for the generated site."""
import os, re
from urllib.parse import urldefrag

root = os.path.dirname(os.path.abspath(__file__))
os.chdir(root)

pages = []
for dp, dn, fn in os.walk("."):
    if ".git" in dp or "__pycache__" in dp:
        continue
    for f in fn:
        if f.endswith(".html"):
            pages.append(os.path.relpath(os.path.join(dp, f), ".").replace(os.sep, "/"))

ids_by_page = {}
for p in pages:
    ids_by_page[p] = set(re.findall(r'\sid="([^"]+)"', open(p, encoding="utf-8").read()))

bad, anchors_missing, checked = [], [], 0
for p in sorted(pages):
    src = open(p, encoding="utf-8").read()
    base = os.path.dirname(p)
    for url in re.findall(r'(?:href|src)="([^"]+)"', src):
        if url.startswith(("http://", "https://", "mailto:", "tel:", "data:")):
            continue
        if url.startswith("#"):
            if len(url) > 1 and url[1:] not in ids_by_page[p]:
                anchors_missing.append(f"{p} -> {url}")
            continue
        path, frag = urldefrag(url)
        if not path:
            continue
        target = os.path.normpath(os.path.join(base, path)).replace(os.sep, "/")
        checked += 1
        if not os.path.exists(target):
            bad.append(f"{p} -> {url}   (missing {target})")
        elif frag and target.endswith(".html") and frag not in ids_by_page.get(target, set()):
            anchors_missing.append(f"{p} -> {url}")

print(f"pages: {len(pages)}    internal links checked: {checked}")
print(f"BROKEN LINKS: {len(bad)}")
for b in bad[:25]:
    print("  ", b)
print(f"MISSING ANCHORS: {len(set(anchors_missing))}")
for a in sorted(set(anchors_missing))[:25]:
    print("  ", a)

refs = set()
for p in pages:
    src = open(p, encoding="utf-8").read()
    base = os.path.dirname(p)
    for url in re.findall(r'(?:src|href|content)="([^"]*?([^"/]+\.(?:jpg|png|ico|webp)))"', src):
        url = url[0]
        if url.startswith(("http://", "https://")):
            url = url.split("/", 3)[-1] if url.count("/") > 2 else url
            base = "."

        refs.add(os.path.normpath(os.path.join(base, url)).replace(os.sep, "/"))
on_disk = set()
for dp, dn, fn in os.walk("images"):
    for f in fn:
        on_disk.add(os.path.join(dp, f).replace(os.sep, "/"))
unused = sorted(on_disk - refs)
print(f"\nimages on disk never referenced: {len(unused)}")
for u in unused:
    print("  ", u)
