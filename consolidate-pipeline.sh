#!/bin/bash

SRC=~/Documents/flat-earth-equipment
DEST=~/Documents/flatearthsite

echo "🔄  Merging ingest/json from $SRC → $DEST ..."
mkdir -p "$DEST/ingest/json"
for f in "$SRC/ingest/json"/*.json; do
  base=$(basename "$f")
  if [ ! -f "$DEST/ingest/json/$base" ]; then
    cp "$f" "$DEST/ingest/json/"
    echo "   • copied $base"
  fi
done

echo -e "\n📂  Moving product-pipeline.sh into $DEST ..."
if [ -f "$SRC/product-pipeline.sh" ]; then
  mv "$SRC/product-pipeline.sh" "$DEST/"
fi
chmod +x "$DEST/product-pipeline.sh"

echo -e "\n✅  Consolidation done.\n"

# Run Full Product Pipeline
cd "$DEST" || { echo "❌  Destination folder missing"; exit 1; }

echo "🔍  Sanity checks ..."
[ -d ingest/json ]              || { echo "❌  ingest/json missing"; exit 1; }
[ -f prisma/schema.prisma ]     || { echo "❌  prisma/schema.prisma missing"; exit 1; }
[ $(ls ingest/json/*.json | wc -l) -gt 0 ] || { echo "❌  No JSON files"; exit 1; }

echo -e "\n▶️  Running pipeline ..."
./product-pipeline.sh "$DEST" || { echo "🚨  Pipeline stopped—see messages above."; exit 1; }

echo -e "\n🌐  Open in your browser:"
echo "   • http://localhost:3000/parts/charger-modules/electrical"
echo "   • http://localhost:3000/feed/google-merchant.json"

echo -e "\n🎉  All done!  If pages look good, run:"
echo "   git init (if needed) && git add . && git commit -m \"import products\""
echo "   git push … then deploy on Vercel." 