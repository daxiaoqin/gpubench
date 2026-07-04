// Structured data (JSON-LD) for search engines
// Provides rich snippets in Google/Bing/Yandex results

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GPUBench.online",
    alternateName: "GPU Hashrate Database & Mining Calculator",
    url: "https://gpubench.online",
    description:
      "Real-world GPU benchmark data across mining algorithms. Compare hashrates, efficiency, and profitability for RTX 50/40/30 series and AMD Radeon GPUs.",
    inLanguage: ["en", "zh"],
  };
}

export function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GPU Mining Profitability Calculator",
    url: "https://gpubench.online/calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description: "Calculate GPU mining profitability based on hashrate, power draw, electricity cost, and coin price.",
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://gpubench.online${item.url}`,
    })),
  };
}

export function getTechArticleSchema(title: string, description: string, date: string, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    datePublished: date,
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "GPUBench.online",
    },
    about: {
      "@type": "Thing",
      name: category,
    },
  };
}

// Render JSON-LD as script tag
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
