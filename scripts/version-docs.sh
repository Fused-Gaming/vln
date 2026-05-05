#!/usr/bin/env bash
# VLN Documentation Version Management Script
# Usage: bash scripts/version-docs.sh <command> [args]

set -euo pipefail

MANIFEST="docs/versioning/VERSION_MANIFEST.json"
DOCS_DIR="docs-site/src/content/docs"
CHANGELOG="CHANGELOG.md"

# ─────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────

log()  { echo "📚 $*"; }
ok()   { echo "✅ $*"; }
err()  { echo "❌ $*" >&2; exit 1; }
warn() { echo "⚠️  $*"; }

require_python() {
  command -v python3 >/dev/null 2>&1 || err "python3 is required but not installed"
}

require_manifest() {
  [ -f "$MANIFEST" ] || err "VERSION_MANIFEST.json not found at $MANIFEST"
}

get_current_version() {
  python3 -c "
import json
with open('$MANIFEST') as f:
    m = json.load(f)
print(m['current']['version'])
"
}

bump_version() {
  local current="$1"
  local segment="$2"

  python3 -c "
parts = '$current'.split('.')
major, minor, patch = int(parts[0]), int(parts[1]), int(parts[2])
if '$segment' == 'major':
    major += 1; minor = 0; patch = 0
elif '$segment' == 'minor':
    minor += 1; patch = 0
elif '$segment' == 'patch':
    patch += 1
print(f'{major}.{minor}.{patch}')
"
}

# ─────────────────────────────────────────────────────
# Commands
# ─────────────────────────────────────────────────────

cmd_status() {
  require_python
  require_manifest

  python3 << EOF
import json
from datetime import datetime

with open('$MANIFEST') as f:
    m = json.load(f)

c = m['current']
print()
print("VLN Documentation Status")
print("-" * 40)
print(f"Version:   v{c['version']}")
print(f"Channel:   {c['channel']}")
print(f"Released:  {c['released']}")
print(f"Status:    {c['status']}")
print(f"Branch:    {c.get('branch', 'unknown')}")
print()
print(f"All versions ({len(m['versions'])} total):")
for v in m['versions']:
    label = f" [{v.get('label', '')}]" if v.get('label') else ""
    print(f"  v{v['version']}{label} — {v['released']} ({v['status']})")
print()
EOF
}

cmd_validate() {
  require_python
  require_manifest

  log "Validating VERSION_MANIFEST.json..."

  if ! python3 -m json.tool "$MANIFEST" > /dev/null 2>&1; then
    err "VERSION_MANIFEST.json is not valid JSON"
  fi
  ok "VERSION_MANIFEST.json is valid JSON"

  log "Validating frontmatter in $DOCS_DIR..."

  python3 << 'PYEOF'
import os, sys
try:
    import yaml
except ImportError:
    print("⚠️  PyYAML not installed — skipping frontmatter validation")
    print("   Install with: pip install pyyaml")
    sys.exit(0)

DOCS_DIR = "docs-site/src/content/docs"
REQUIRED = ["title", "description"]
errors = []
checked = 0

for root, dirs, files in os.walk(DOCS_DIR):
    for filename in files:
        if not filename.endswith(('.md', '.mdx')):
            continue
        filepath = os.path.join(root, filename)
        checked += 1
        with open(filepath) as f:
            content = f.read()
        if not content.startswith('---'):
            errors.append(f"{filepath}: Missing frontmatter")
            continue
        parts = content.split('---', 2)
        if len(parts) < 3:
            errors.append(f"{filepath}: Malformed frontmatter")
            continue
        try:
            fm = yaml.safe_load(parts[1]) or {}
        except yaml.YAMLError as e:
            errors.append(f"{filepath}: Invalid YAML: {e}")
            continue
        for field in REQUIRED:
            if field not in fm or not fm[field]:
                errors.append(f"{filepath}: Missing '{field}'")

print(f"Checked {checked} documentation files")
if errors:
    print(f"\n❌ {len(errors)} error(s) found:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
else:
    print(f"✅ All {checked} files have valid frontmatter")
PYEOF

  ok "Validation complete"
}

cmd_bump() {
  require_python
  require_manifest

  local segment="${1:-patch}"
  [[ "$segment" =~ ^(major|minor|patch)$ ]] || err "Invalid segment: $segment (use: major, minor, patch)"

  local current
  current=$(get_current_version)
  local next
  next=$(bump_version "$current" "$segment")
  local today
  today=$(date +%Y-%m-%d)

  log "Bumping $segment: v$current → v$next"

  python3 << PYEOF
import json
from datetime import date

with open('$MANIFEST') as f:
    m = json.load(f)

# Archive current as a version entry if not already present
current = m['current']
version_exists = any(v['version'] == current['version'] for v in m['versions'])
if not version_exists:
    # Add current to versions with maintained status
    new_entry = {
        'version': current['version'],
        'channel': current['channel'],
        'released': current['released'],
        'status': 'maintained',
        'label': None,
        'branch': current.get('branch', 'main'),
        'highlights': []
    }
    m['versions'].insert(0, new_entry)

# Update current
m['current'] = {
    'version': '$next',
    'channel': 'stable',
    'released': '$today',
    'commit': 'HEAD',
    'branch': 'main',
    'changelog_entry': f"CHANGELOG.md#{next.replace('.', '')}---$today",
    'status': 'active'
}

# Update the first versions entry to active
if m['versions']:
    # Update the version we just added to be maintained
    for v in m['versions']:
        if v['version'] == current['version']:
            v['status'] = 'maintained'
            v['label'] = None
            break

# Add new version as active
m['versions'].insert(0, {
    'version': '$next',
    'channel': 'stable',
    'released': '$today',
    'status': 'active',
    'label': 'Current',
    'branch': 'main',
    'highlights': []
})

m['updated'] = '${today}T00:00:00Z'

with open('$MANIFEST', 'w') as f:
    json.dump(m, f, indent=2)
    f.write('\n')

print(f"✅ VERSION_MANIFEST.json updated: v{current['version']} → $next")
PYEOF

  ok "Version bumped to v$next"
  warn "Remember to:"
  echo "  1. Add highlights to the new version entry in $MANIFEST"
  echo "  2. Add a CHANGELOG.md entry for v$next"
  echo "  3. Commit: git commit -m 'docs(vln): release v$next'"
}

cmd_report() {
  require_python
  require_manifest

  python3 << EOF
import json, os
from datetime import datetime

with open('$MANIFEST') as f:
    m = json.load(f)

# Count docs
total_docs = 0
for root, dirs, files in os.walk('$DOCS_DIR'):
    total_docs += sum(1 for f in files if f.endswith(('.md', '.mdx')))

c = m['current']
print()
print("=" * 60)
print("VLN Documentation Version Report")
print(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
print("=" * 60)
print(f"\n📌 Current Version: v{c['version']}")
print(f"   Channel:  {c['channel']}")
print(f"   Released: {c['released']}")
print(f"   Branch:   {c.get('branch', 'main')}")
print(f"\n📄 Documentation:")
print(f"   Total files: {total_docs}")
print(f"   Docs path:   $DOCS_DIR")
print(f"\n📚 Version History:")
for v in m['versions']:
    label = f" [{v.get('label')}]" if v.get('label') else ""
    highs = v.get('highlights', [])
    high_str = f" — {highs[0]}" if highs else ""
    print(f"   v{v['version']}{label} ({v['released']}, {v['status']}){high_str}")
print()
EOF
}

# ─────────────────────────────────────────────────────
# Dispatch
# ─────────────────────────────────────────────────────

COMMAND="${1:-help}"

case "$COMMAND" in
  status)   cmd_status ;;
  validate) cmd_validate ;;
  bump)     cmd_bump "${2:-patch}" ;;
  report)   cmd_report ;;
  help|--help|-h)
    echo ""
    echo "VLN Documentation Version Management"
    echo ""
    echo "Usage: bash scripts/version-docs.sh <command> [args]"
    echo ""
    echo "Commands:"
    echo "  status            Show current version and all tracked versions"
    echo "  validate          Validate VERSION_MANIFEST.json and frontmatter"
    echo "  bump <segment>    Bump version (major | minor | patch)"
    echo "  report            Generate full version report"
    echo "  help              Show this help"
    echo ""
    echo "Examples:"
    echo "  bash scripts/version-docs.sh status"
    echo "  bash scripts/version-docs.sh bump minor"
    echo "  bash scripts/version-docs.sh validate"
    echo ""
    ;;
  *)
    err "Unknown command: $COMMAND — run 'bash scripts/version-docs.sh help'"
    ;;
esac
