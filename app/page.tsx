import Link from "next/link";
import Seo from "./components/Seo";

export default function HomePage() {
  const url = `${process.env.SITE_URL}/`;
  return (
    <>
      <Seo
        title="Flat Earth Equipment"
        description="High-performance parts and rentals for industrial equipment"
        url={url}
      />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-5xl font-extrabold mb-4">Flat Earth Equipment</h1>
        <p className="text-xl text-gray-700 mb-8">
          Your one-stop shop for parts and rentals
        </p>
        <div className="flex space-x-4">
          <Link href="/parts/charger-modules/electrical" className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition">
            Find Parts
          </Link>
          <Link href="/rentals" className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow hover:bg-green-700 transition">
            Rent Equipment
          </Link>
        </div>
      </main>
    </>
  );
} 