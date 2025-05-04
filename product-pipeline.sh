#!/bin/bash

# Accept first argument as project root or prompt if missing
if [ $# -ge 1 ]; then
  REPO="$1"
else
  read -p "📂  Paste the full path to your project root: " REPO
fi
if [ ! -d "$REPO" ]; then
  echo "❌  Folder not found: $REPO"; exit 1;
fi
cd "$REPO"

# 0  Sanity checks
[[ -d ingest/json ]] || { echo "❌  ingest/json folder missing"; exit 1; }
[[ $(ls ingest/json/*.json 2>/dev/null | wc -l) -gt 0 ]] || { echo "❌  No JSON files in ingest/json"; exit 1; }
[[ -f prisma/schema.prisma ]] || { echo "❌  prisma/schema.prisma not found — run scaffold or add schema, then rerun."; exit 1; }

# 1  JSON ➜ CSV
echo -e "\n🔄  Converting JSON ➜ CSV …"
npm run convert:json-to-csv || { echo "🚨  JSON ➜ CSV step failed"; exit 1; }

# 2  Generate Prisma client
echo -e "\n📐  Running npx prisma generate …"
npx prisma generate || { echo "🚨  prisma generate failed"; exit 1; }

# 3  Import into Supabase
echo -e "\n📦  Importing products into Supabase via Prisma …"
npm run import:to-supabase || { echo "🚨  Import step failed"; exit 1; }

# 4  Rebuild Google-Merchant feed
echo -e "\n🛠️   Rebuilding Merchant feed …"
node scripts/build-merchant-feed.js || { echo "🚨  Feed build failed"; exit 1; }

# 5  Restart dev server (background)
echo -e "\n🚀  Restarting dev server …"
pkill -f "npm run dev" 2>/dev/null || true
npm run dev --silent &
sleep 5

# 6  Success message
echo -e "\n🌐  Open in your browser:"
echo "   • http://localhost:3000/parts/charger-modules/electrical"
echo "   • http://localhost:3000/feed/google-merchant.json"
echo -e "\n🎉  Pipeline complete — if those URLs look good, run:"
echo "      git init   # if not already"
echo "      git add ."
echo "      git commit -m \"import products & rebuild feed\""
echo "      git push … && deploy on Vercel" 