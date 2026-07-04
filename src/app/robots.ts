import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/", // API endpoints don't need indexing
      },
      // Baidu-specific rules
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: "/api/",
      },
      // Yandex-specific rules
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: [
      "https://gpubench.online/sitemap.xml",
      // Add Baidu sitemap URL if different
    ],
  };
}
