import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "GPUBench — GPU Hashrate Database & Mining Calculator",
  description:
    "Real-world GPU benchmark data across mining algorithms. Compare hashrates, efficiency, and profitability for RTX 50/40/30 series and AMD Radeon GPUs.",
  keywords: [
    "GPU hashrate",
    "mining calculator",
    "RTX 5080 hashrate",
    "RTX 5090 mining",
    "PearlHash",
    "Blake3",
    "KawPow",
    "GPU benchmark",
    "cryptocurrency mining",
    "GPU profitability",
    "PeakMiner",
    "mining pool",
    "GPU mining tutorial",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gpubench.online",
  },
  openGraph: {
    title: "GPUBench — GPU Hashrate Database & Mining Calculator",
    description:
      "Real-world GPU benchmark data across mining algorithms. Find the most profitable GPU for your setup.",
    type: "website",
    url: "https://gpubench.online",
    siteName: "GPUBench.online",
    locale: "en_US",
    images: [
      {
        url: "https://gpubench.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "GPUBench.online — GPU Hashrate Database & Mining Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPUBench — GPU Hashrate Database & Mining Calculator",
    description:
      "Real-world GPU benchmark data across mining algorithms. Find the most profitable GPU for your setup.",
    images: ["https://gpubench.online/og-image.png"],
  },
  verification: {
    google: "googlee0da5c4d8d31ab16",
    yandex: "cdbd4e9f85b3b012",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GPUBench.online",
    alternateName: "GPU Hashrate Database & Mining Calculator",
    url: "https://gpubench.online",
    description:
      "Real-world GPU benchmark data across mining algorithms. Compare hashrates, efficiency, and profitability for RTX 50/40/30 series and AMD Radeon GPUs.",
    inLanguage: ["en", "zh"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gpubench.online/gpus?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={<div className="h-16 bg-[--bg-secondary] border-b border-[--border-color]" />}>
          <NavBar />
        </Suspense>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
