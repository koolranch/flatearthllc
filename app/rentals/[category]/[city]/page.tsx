import Seo from "../../../components/Seo";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default async function RentalCityPage({ params }: any) {
  const slug = `${params.category}-${params.city}`;
  const { data } = await supabase.from("rental_listing").select("*").eq("slug", slug);
  const listing = data?.[0];
  const url = `${process.env.SITE_URL}/rentals/${params.category}/${params.city}`;
  return (
    <>
      <Seo
        title={`${params.category} Rentals in ${params.city.replace("-", " ")} | Flat Earth`}
        description={`Request a quote for ${params.category} rentals in ${params.city.replace("-", " ")}.`}
        url={url}
      />
      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold capitalize">
          {params.category} Rentals in {params.city.replace("-", " ")}
        </h1>
        {listing?.isPlaceholder ? (
          <div className="rounded border p-6 text-center">
            <p className="mb-4 text-gray-700">
              We're expanding our rental fleet in this region.
            </p>
            <button className="rounded bg-flat-secondary px-4 py-2 text-white">
              Request a Quote
            </button>
          </div>
        ) : (
          <p>Real rental listing goes here.</p>
        )}
      </div>
    </>
  );
} 