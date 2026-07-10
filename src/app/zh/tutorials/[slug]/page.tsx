import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllZhSlugs, getZhTutorialBySlug } from "@/lib/zh-tutorial-content";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllZhSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getZhTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: `${tutorial.title} | GPUBench.online 挖矿教程`,
    description: tutorial.description,
    alternates: {
      canonical: `https://gpubench.online/zh/tutorials/${slug}`,
    },
    openGraph: {
      title: `${tutorial.title} — 显卡挖矿教程`,
      description: tutorial.description,
      url: `https://gpubench.online/zh/tutorials/${slug}/`,
      images: [{ url: "https://gpubench.online/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutorial.title} — 显卡挖矿教程`,
      description: tutorial.description,
      images: ["https://gpubench.online/og-image.png"],
    },
  };
}

const badgeColors: Record<string, string> = {
  "基础": "bg-blue-500/10 text-blue-400",
  "硬件": "bg-purple-500/10 text-purple-400",
  "软件": "bg-emerald-500/10 text-emerald-400",
  "策略": "bg-orange-500/10 text-orange-400",
  "故障排除": "bg-rose-500/10 text-rose-400",
};

export default async function ZhTutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getZhTutorialBySlug(slug);
  if (!tutorial) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-[--text-muted]">
        <Link href="/zh/tutorials" className="hover:text-[--text-primary]">教程</Link>
        <span className="mx-2">›</span>
        <span className="text-[--text-secondary]">{tutorial.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[tutorial.category]}`}>
            {tutorial.category}
          </span>
          <span className="text-xs text-[--text-muted]">{tutorial.readTime}</span>
          <span className="text-xs text-[--text-muted]">•</span>
          <span className="text-xs text-[--text-muted]">{tutorial.difficulty}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{tutorial.title}</h1>
        <p className="text-[--text-secondary]">{tutorial.description}</p>
      </div>

      {/* Content */}
      <article className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6 md:p-8">
        {tutorial.content}
      </article>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/zh/tutorials"
          className="inline-flex px-5 py-2.5 rounded-xl bg-[--bg-card] border border-[--border-color] text-sm hover:bg-[--bg-card-hover] transition-all"
        >
          ← 返回教程列表
        </Link>
      </div>
    </div>
  );
}
