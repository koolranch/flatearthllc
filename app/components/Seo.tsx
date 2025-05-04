import Head from "next/head";
type Props = {
  title: string;
  description: string;
  url: string;
  product?: { sku: string; price: number; brand: string };
};
export default function Seo({ title, description, url, product }: Props) {
  const schema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        sku: product.sku,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: "https://schema.org/InStock",
          url,
        },
        brand: { "@type": "Brand", name: product.brand },
      }
    : null;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </Head>
  );
} 