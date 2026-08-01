import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJobPostingBySlug, getOpenJobPostings, summarize } from "@/lib/jobPostings";

export async function generateStaticParams() {
  const jobs = await getOpenJobPostings();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobPostingBySlug(slug);
  if (!job) return {};

  const title = job.title.trim();
  const description = summarize(job.description);
  const image = `/jobs/${slug}/og.png`;

  return {
    title,
    description,
    openGraph: { title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobPostingBySlug(slug);
  if (!job) notFound();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 dark:text-emerald-400"
        >
          ← All openings
        </Link>
        <Image
          src={`/jobs/${slug}/og.png`}
          alt={job.title.trim()}
          width={1200}
          height={630}
          className="h-auto w-full rounded-2xl border border-slate-900/10 dark:border-white/10"
          priority
        />
      </div>
    </div>
  );
}
