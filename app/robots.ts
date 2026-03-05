import { MetadataRoute } from "next";
import { SITE } from "@/app/data/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
