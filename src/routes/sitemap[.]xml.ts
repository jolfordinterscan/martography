import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  getGalleryPhotos,
  getPublishedPrints,
  getPublishedStories,
  getPublicSpecies,
} from "@/content";

const BASE_URL = "https://martography.co";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/gallery",
          "/species",
          "/prints",
          "/stories",
          "/education",
          "/about",
          "/contact",
          ...getGalleryPhotos().map((photo) => `/gallery/${photo.slug}`),
          ...getPublicSpecies().map((species) => `/species/${species.slug}`),
          ...getPublishedPrints().map((print) => `/prints/${print.slug}`),
          ...getPublishedStories().map((story) => `/stories/${story.slug}`),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(
            (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
