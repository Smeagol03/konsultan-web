import { MetadataRoute } from "next";
import { SITE } from "@/app/data/site-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Idealnya tambahkan ikon PNG 192x192 dan 512x512 di sini jika ada di folder public
    ],
  };
}
