import Seo from "../components/Seo";
export default function GuideIndex() {
  const url = `${process.env.SITE_URL}/guide`;
  return (
    <>
      <Seo title="Guides & How‑Tos | Flat Earth Equipment"
           description="Repair tips, brand comparisons, and equipment maintenance guides."
           url={url}/>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Guides & How‑Tos</h1>
        <p className="mt-4 text-gray-600">
          Blog migration coming soon. Stay tuned!
        </p>
      </div>
    </>
  );
} 