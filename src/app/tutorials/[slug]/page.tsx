import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getTutorialBySlug } from "@/lib/tutorial-content";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: `${tutorial.title} | GPUBench.online Mining Tutorials`,
    description: tutorial.description,
    alternates: {
      canonical: `https://gpubench.online/tutorials/${slug}`,
    },
    openGraph: {
      title: `${tutorial.title} — GPU Mining Tutorial`,
      description: tutorial.description,
      url: `https://gpubench.online/tutorials/${slug}`,
    },
  };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const badgeColors: Record<string, string> = {
    Basics: "bg-blue-500/10 text-blue-400",
    Hardware: "bg-purple-500/10 text-purple-400",
    Software: "bg-green-500/10 text-green-400",
    Strategy: "bg-orange-500/10 text-orange-400",
    Troubleshooting: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-[--text-muted]">
        <Link href="/tutorials" className="hover:text-[--text-primary]">Tutorials</Link>
        <span className="mx-2">›</span>
        <span className="text-[--text-secondary]">{tutorial.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[tutorial.category]}`}>
            {tutorial.category}
          </span>
          <span className="text-xs text-[--text-muted]">{tutorial.readTime} read</span>
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
          href="/tutorials"
          className="inline-flex px-5 py-2.5 rounded-xl bg-[--bg-card] border border-[--border-color] text-sm hover:bg-[--bg-card-hover] transition-all"
        >
          ← Back to All Tutorials
        </Link>
      </div>
    </div>
  );
}
