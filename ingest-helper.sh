#!/usr/bin/env bash
# === Interactive JSON‑ingest helper ===

mkdir -p ingest/json

while true; do
  echo
  read -p "📝  Enter slug (or press Enter to quit): " SLUG
  [[ -z "$SLUG" ]] && echo "👋  Done." && break
  FILE="ingest/json/$SLUG.json"
  echo "📋  Paste JSON, then Ctrl-D (mac/linux) or Ctrl-Z ↵ (windows):"
  cat > "$FILE"
  echo -e "\n✅  Saved $FILE"
  jq . "$FILE" 2>/dev/null || echo "(jq not installed—raw JSON shown)"
done
# === End helper === 