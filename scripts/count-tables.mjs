import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  const tables = ["part", "rental_listing"];
  let allGood = true;

  for (const t of tables) {
    const { count, error } = await supabase
      .from(t)
      .select('id', { head: true, count: 'exact' });
    if (error) {
      console.log(`❌  ${t} – ${error.message}`);
      allGood = false;
    } else {
      console.log(`✅  ${t} – ${count} rows`);
    }
  }

  if (allGood) {
    console.log("\n🎉  Schema & seed data look good! Continue to the next milestones.");
  } else {
    console.log("\n⚠️  One or more tables missing / unreadable. Re-run supabase/schema.sql and check RLS.");
  }
  process.exit(allGood ? 0 : 1);
})(); 