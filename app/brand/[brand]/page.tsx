import Seo from "../../components/Seo";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default async function BrandPage({ params }) {
  const { data: parts } = await supabase
    .from("part")
    .select("*")
    .ilike("slug", `%${params.brand}%`);
  const title = `${params.brand} Parts | Flat Earth Equipment`;
  const url = `${process.env.SITE_URL}/brand/${params.brand}`;
  return (
    <>
      <Seo title={title} description={`Shop genuine ${params.brand} parts.`} url={url} />
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold">{params.brand} Parts</h1>
        {parts?.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((p) => (
              <li key={p.id} className="rounded border p-4">
                <h2 className="font-medium">{p.name}</h2>
                <p className="text-sm text-gray-600">${p.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No parts listed yet—check back soon!</p>
        )}
      </div>
    </>
  );
} 