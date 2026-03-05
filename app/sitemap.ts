import { MetadataRoute } from "next";
import { SITE } from "@/app/data/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // Halaman utama
  const routes = [
    "",
    // Tambahkan rute lain di sini jika ada, misalnya:
    // "/karya",
    // "/kontak",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
