#!/usr/bin/env python3
"""
KAKKAMVELLY TEMPLE — Build Script
Runs before every git push. Does:
  1. Auto-increment version (version.json)
  2. Rebuild app.min.js safely (no URL corruption)
  3. Rebuild temple.min.css
  4. Inject version into HTML + SW
  5. Validate all dynamic features present
  6. Fail loudly if anything is broken
"""
import re, os, json, sys, subprocess
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))

def err(msg):
    print(f"\n❌ BUILD FAILED: {msg}")
    sys.exit(1)

def ok(msg): print(f"  ✅ {msg}")
def info(msg): print(f"  ℹ️  {msg}")

print("\n" + "═"*55)
print("  KAKKAMVELLY TEMPLE — BUILD")
print("═"*55 + "\n")

# ── STEP 1: Auto-increment version ──────────────────────
print("STEP 1: Version")
vf = os.path.join(ROOT, 'version.json')
if os.path.exists(vf):
    with open(vf) as f: vdata = json.load(f)
else:
    vdata = {"major": 1, "minor": 0, "patch": 0, "build": 0}

vdata['build'] += 1
vdata['patch'] += 1 if vdata['build'] % 5 == 0 else 0
version_str  = f"v{vdata['major']}.{vdata['minor']}.{vdata['patch']}.{vdata['build']}"
build_str    = version_str
sw_cache_key = f"kvt-{version_str.replace('.', '-')}-b{vdata['build']}"

with open(vf, 'w') as f: json.dump(vdata, f, indent=2)
ok(f"Version: {build_str} → SW: {sw_cache_key}")

# ── STEP 2: Rebuild app.min.js ──────────────────────────
print("\nSTEP 2: JS bundle")
JS_FILES = [
    'js/main.js', 'js/krishna-animations.js', 'js/mobile-futuristic.js',
    'js/live-features.js', 'js/enhancements.js', 'js/language.js',
]
combined_js = f"/* Kakkamvelly Temple {build_str} — {datetime.now().strftime('%Y-%m-%d')} */\n"

for f in JS_FILES:
    path = os.path.join(ROOT, f)
    if not os.path.exists(path):
        info(f"Skipping missing: {f}")
        continue
    with open(path) as fh: content = fh.read()

    # Safe minification:
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    lines = []
    for line in content.split('\n'):
        stripped = line.strip()
        if stripped.startswith('//'): continue  # skip comment-only lines
        # Strip inline comments safely (preserving https://)
        result = ''; in_s = in_d = in_t = False; i = 0
        while i < len(line):
            c = line[i]; nc = line[i+1] if i+1 < len(line) else ''
            if   c == "'" and not in_d and not in_t: in_s = not in_s
            elif c == '"' and not in_s and not in_t: in_d = not in_d
            elif c == '`' and not in_s and not in_d: in_t = not in_t
            # Only strip // NOT inside a string AND NOT preceded by :
            if c == '/' and nc == '/' and not in_s and not in_d and not in_t:
                if i == 0 or line[i-1] != ':': break
            result += c; i += 1
        lines.append(result)
    content = '\n'.join(lines)
    content = re.sub(r'\n\s*\n', '\n', content)
    content = re.sub(r'  +', ' ', content)
    combined_js += content.strip() + '\n'

out_js = os.path.join(ROOT, 'js/app.min.js')
with open(out_js, 'w') as f: f.write(combined_js)
js_kb = os.path.getsize(out_js) // 1024
ok(f"app.min.js: {js_kb}KB")

# ── STEP 3: Validate all dynamic functions present ──────
print("\nSTEP 3: Dynamic feature validation")
REQUIRED_FUNCS = [
    'initDarshanBar', 'initNextDarshan', 'initFestivalCountdown',
    'initAnnadhanam', 'initWeather', 'initSunriseSunset', 'initMoonPhase',
    'initLiveClock', 'initScrollProgress', 'initKulamCountdown',
]
REQUIRED_URLS  = ['open-meteo.com/v1/forecast', 'wa.me/919', 'maps.app.goo']

for fn in REQUIRED_FUNCS:
    if fn not in combined_js: err(f"Function missing from bundle: {fn}")
ok(f"All {len(REQUIRED_FUNCS)} dynamic functions present")

for url in REQUIRED_URLS:
    if url not in combined_js: err(f"URL corrupted in bundle: {url}")
ok(f"All URLs intact (https:// not corrupted)")

cut_urls = list(re.finditer(r'https: [^/]', combined_js))
if cut_urls: err(f"{len(cut_urls)} cut https:// found — fix minifier!")
ok("No corrupted https:// URLs")

# ── STEP 4: Rebuild temple.min.css ──────────────────────
print("\nSTEP 4: CSS bundle")
CSS_FILES = [
    'css/style.css', 'css/krishna-animations.css', 'css/baby-krishna.css',
    'css/live-widgets.css', 'css/ruflo-v3.css', 'css/mobile-futuristic.css',
    'css/galaxy.css', 'css/coder-polish.css', 'css/overlap-fixes.css',
]
combined_css = f"/* Kakkamvelly Temple {build_str} */\n"
for f in CSS_FILES:
    path = os.path.join(ROOT, f)
    if not os.path.exists(path): continue
    with open(path) as fh: c = fh.read()
    c = re.sub(r'/\*.*?\*/', '', c, flags=re.DOTALL)
    c = re.sub(r'\s+', ' ', c)
    c = re.sub(r' *([{};:,]) *', r'\1', c)
    combined_css += c.strip()

out_css = os.path.join(ROOT, 'css/temple.min.css')
with open(out_css, 'w') as f: f.write(combined_css)
css_kb = os.path.getsize(out_css) // 1024
ok(f"temple.min.css: {css_kb}KB")

# ── STEP 5: Update SW cache key ─────────────────────────
print("\nSTEP 5: Service Worker")
sw_path = os.path.join(ROOT, 'sw.js')
with open(sw_path) as f: sw = f.read()
old_cache = re.search(r"const CACHE = '([^']+)'", sw)
if old_cache:
    sw = sw.replace(f"const CACHE = '{old_cache.group(1)}'",
                    f"const CACHE = '{sw_cache_key}'")
    with open(sw_path, 'w') as f: f.write(sw)
    ok(f"SW cache: {old_cache.group(1)} → {sw_cache_key}")
else:
    err("Could not find CACHE key in sw.js")

# ── STEP 6: Inject version into HTML ────────────────────
print("\nSTEP 6: Inject version into HTML")
html_path = os.path.join(ROOT, 'index.html')
with open(html_path) as f: html = f.read()

# Update version badge text
html = re.sub(
    r'(<span class="site-version-badge"[^>]*>)[^<]*(</span>)',
    rf'\g<1>{version_str}\g<2>', html
)
# Update meta generator
if 'meta name="generator"' in html:
    html = re.sub(
        r'<meta name="generator"[^>]+>',
        f'<meta name="generator" content="Kakkamvelly Temple {build_str}" />',
        html
    )
else:
    html = html.replace('</head>',
        f'  <meta name="generator" content="Kakkamvelly Temple {build_str}" />\n</head>')

with open(html_path, 'w') as f: f.write(html)
ok(f"HTML version badge: {version_str}")

# ── STEP 7: Final HTML validation ───────────────────────
print("\nSTEP 7: HTML validation")
with open(html_path) as f: html = f.read()

if not html.strip().endswith('</html>'): err("HTML does not end with </html>")
ok("HTML closes cleanly")

after_html = html.strip()[html.strip().rfind('</html>')+7:]
if after_html.strip(): err(f"Orphaned content after </html>: {after_html[:50]}")
ok("No orphan content after </html>")

REQUIRED_IDS = ['festival-countdown','ann-next-date','weather-widget',
                 'darshan-status-widget','next-darshan-countdown']
for eid in REQUIRED_IDS:
    if f'id="{eid}"' not in html: err(f"Missing dynamic slot: #{eid}")
ok(f"All {len(REQUIRED_IDS)} dynamic HTML slots present")

# ── DONE ────────────────────────────────────────────────
print(f"\n{'═'*55}")
print(f"  ✅ BUILD SUCCESS")
print(f"  Version:  {build_str}")
print(f"  SW cache: {sw_cache_key}")
print(f"  JS:       {js_kb}KB")
print(f"  CSS:      {css_kb}KB")
print(f"{'═'*55}\n")
