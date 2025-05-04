import { readdirSync, readFileSync, writeFileSync } from "fs";
import { parse } from "json2csv";

const rows = [];
const dir = "ingest/json";
for (const f of readdirSync(dir).filter(x => x.endsWith(".json"))) {
  const p = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
  rows.push({
    sku: p.sku,
    name: p.name,
    description: p.description_html,
    price: p.price,
    brand_name: p.brand,
    system_name: p.system,
    category_name: p.category,
    slug: p.slug
  });
}

writeFileSync("ingest/parts-upload.csv", parse(rows));
console.log(`✅ CSV ready: ingest/parts-upload.csv (${rows.length} rows)`); 