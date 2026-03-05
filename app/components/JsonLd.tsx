import { SITE, SOCIAL_LINKS } from "@/app/data/site-data";
import { Organization, WithContext, LocalBusiness } from "schema-dts";

export default function JsonLd() {
  const jsonLd: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalBusiness" as any,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.image}`,
    description: SITE.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Selong",
      addressRegion: "Nusa Tenggara Barat",
      postalCode: "83611",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.6477,
      longitude: 116.5332,
    },
    telephone: SITE.phone,
    email: SITE.email,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.behance,
      SOCIAL_LINKS.linkedin,
    ],
    image: `${SITE.url}${SITE.image}`,
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
