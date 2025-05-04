import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

(async () => {
  const expectedTables = [
    'brand','system','category','city',
    'part','rental','vendor','rental_listing'
  ];

  // Fetch tables in public schema
  const { data: tables, error: tableError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');

  if (tableError) {
    console.error('Error fetching table list:', tableError);
    process.exit(1);
  }

  const tableNames = (tables || []).map((t) => t.table_name);
  const missing = expectedTables.filter((t) => !tableNames.includes(t));

  if (missing.length) {
    console.log('❌  Missing tables:', missing.join(', '));
  } else {
    console.log('✅  All tables present.');
    const { count: partsCount } = await supabase
      .from('part')
      .select('id', { count: 'exact', head: true });
    const { count: listingCount } = await supabase
      .from('rental_listing')
      .select('id', { count: 'exact', head: true });
    console.log(`🗄️  part rows → ${partsCount}`);
    console.log(`🗄️  rental_listing rows → ${listingCount}`);
  }
  process.exit(0);
})(); 