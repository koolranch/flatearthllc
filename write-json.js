const fs = require('fs');

const productData = {
  "sku": "28115G04",
  "slug": "powerwise-36v-ezgo-charger-28115g04",
  "name": "Powerwise 36V EZGO Charger 28115G04",
  "brand": "Powerwise",
  "category": "battery chargers",
  "system": "electrical",
  "description_html": "<p>Powerwise 28115G04 is a portable charger for batteries of 36‑volt model E‑Z‑GO vehicles. The product is a 13 kg charging unit with a compact design and comes with a 9-ft power cord. The charger can now be purchased here in Cloud Electric, your one-stop shop for all your electric component needs. Cloud Electric is a leading distributor of electronic components in North America. The store takes pride in our informative product descriptions, reliable pricing, and fast shipping.</p><p>Remanufactured OEM Powerwise 36V EZGO Charger 28115G04 will ship to your location in 1‑3 days. Stock rebuilt items will generally ship same day unless prior testing is required. All rebuilt items are subjected to a core charge. The core charge will be refunded once we receive the core in one of our warehouse locations.</p><p>Repair Service for Powerwise 36V EZGO Charger 28115G04: The repair process typically takes 3‑5 business days. But can be completed sooner if parts are readily available. (this is usually the case for top selling items)</p><p>This unit comes with 6 Months warranty upgradable to 36 months.</p>",
  "price": 350.00,
  "specs": null,
  "cross_reference_numbers": [
    "CL7010888",
    "EZ28115‑G04",
    "EZ602714",
    "HU4102836",
    "YP550096542",
    "YP5500965‑42",
    "7010888",
    "28115‑G04",
    "602714",
    "4102836",
    "550096542",
    "5500965‑42"
  ],
  "condition": "Remanufactured",
  "availability": "in stock",
  "image_filename": "powerwise-36v-ezgo-charger-28115g04.webp",
  "meta_title": "Powerwise 36V EZGO Charger 28115G04 | Cloud Electric",
  "meta_description": "Buy Powerwise 28115G04 remanufactured 36V EZGO charger. Fast shipping, 6-month warranty, or send in yours for repair service.",
  "google_product_category": "Business & Industrial > Electrical > Batteries > Battery Chargers",
  "gtin": null
};

fs.writeFileSync('ingest/json/powerwise-36v-ezgo-charger-28115g04.json', JSON.stringify(productData, null, 2)); 