#!/bin/bash

cd ~/Documents/flatearthsite || { echo "❌ ~/Documents/flatearthsite not found"; exit 1; }

# Copy ingestion scripts into root scripts directory
if [ -d flat-earth-equipment/scripts ]; then
  echo "📦  Copying scripts to root 'scripts/' folder..."
  mkdir -p scripts
  cp flat-earth-equipment/scripts/*.mjs scripts/ 2>/dev/null
fi

# 1) Remove the old nested folder
if [ -d flat-earth-equipment ]; then
  echo "🗑️  Deleting stale nested folder…"
  rm -rf flat-earth-equipment
fi

# 2) Patch Prisma schema (make rentalId unique)
SCHEMA=prisma/schema.prisma
if grep -q 'rentalId Int?' "$SCHEMA"; then
  echo "🔧  Patching $SCHEMA to add @unique to rentalId…"
  sed -i.bak 's/rentalId Int\?/rentalId Int? @unique/' "$SCHEMA"
fi

# 3) Regenerate Prisma client
echo -e "\n📐  Running npx prisma generate…"
npx prisma generate || { echo "🚨 prisma generate failed"; exit 1; }

# 4) Import into Supabase via Prisma script
echo -e "\n📦  Importing products…"
node scripts/import-to-supabase.mjs || { echo "🚨 import step failed"; exit 1; }

# 5) Rebuild Google Merchant feed
echo -e "\n🛠️  Rebuilding Merchant feed…"
node scripts/build-merchant-feed.js || { echo "🚨 feed build failed"; exit 1; }

# 6) Restart dev server
echo -e "\n🚀  Restarting Next.js dev server…"
pkill -f "npm run dev" 2>/dev/null || true
npm run dev --silent &
sleep 5

# 7) Success!
echo -e "\n🌐  Local preview URLs:"
echo "   http://localhost:3000/parts/charger-modules/electrical"
echo "   http://localhost:3000/feed/google-merchant.json"
echo -e "\n🎉  Pipeline complete! If everything looks good:"
echo "   git add . && git commit -m \"fix schema & import products\" && git push" 